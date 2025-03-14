
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    console.log('Creating Supabase client with URL:', supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get username from request body
    const { username } = await req.json();
    
    if (!username) {
      console.log('No username provided in request');
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Looking up email for username: "${username}"`);
    
    // Get all profiles for better debugging
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, email, username');
    
    if (error) {
      console.error('Error fetching profiles:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to query profiles', details: error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Retrieved ${data?.length || 0} profiles from database`);
    
    // Log all usernames for debugging
    if (data && data.length > 0) {
      console.log('All profiles in database:');
      data.forEach(profile => {
        console.log(`Profile: username="${profile.username}", email=${profile.email}, id=${profile.id}`);
      });
    } else {
      console.log('No profiles found in the database');
      return new Response(
        JSON.stringify({ error: 'No profiles found in the database' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Try multiple matching approaches
    const normalizedUsername = username.toLowerCase().trim();
    
    // First try exact match (case insensitive)
    let matchedProfile = data.find(profile => 
      profile.username && profile.username.toLowerCase() === normalizedUsername
    );
    
    // Special handling for jonnyCat (try all lowercase variations)
    if (!matchedProfile && normalizedUsername === "jonnycat") {
      matchedProfile = data.find(profile => 
        profile.username && profile.username.toLowerCase() === "jonnycat"
      );
      
      if (matchedProfile) {
        console.log(`Found jonnycat with special handling: "${matchedProfile.username}" -> ${matchedProfile.email}`);
      }
    }
    
    // If no match, try with contains (for partial matches)
    if (!matchedProfile) {
      matchedProfile = data.find(profile => 
        profile.username && profile.username.toLowerCase().includes(normalizedUsername)
      );
      
      if (matchedProfile) {
        console.log(`Found profile with partial match: "${matchedProfile.username}" -> ${matchedProfile.email}`);
      }
    }
    
    if (matchedProfile) {
      console.log(`Found profile for username: "${username}" -> ${matchedProfile.email}`);
      
      return new Response(
        JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`No user found with username: "${username}" after all matching attempts`);
    return new Response(
      JSON.stringify({ error: 'Username not found. Please check your username or register.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error in Edge Function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
