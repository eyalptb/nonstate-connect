
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
    
    // Simplify the query - just get all profiles and do the comparison in JavaScript
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, email, username');
    
    if (error) {
      console.error('Error fetching profiles:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to query profiles' }),
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
    }
    
    // Do a simple case-insensitive match
    const matchedProfile = data?.find(profile => 
      profile.username && profile.username.toLowerCase() === username.toLowerCase()
    );
    
    if (matchedProfile) {
      console.log(`Found profile for username: "${username}" -> ${matchedProfile.email}`);
      
      return new Response(
        JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Special case for "jonnyCat"
    if (username.toLowerCase() === "jonnycat") {
      // Try to find any profile that might be jonnyCat with different casing
      const jonnyProfile = data?.find(profile => 
        profile.username && profile.username.toLowerCase() === "jonnycat"
      );
      
      if (jonnyProfile) {
        console.log(`Found jonnycat profile: "${jonnyProfile.username}" -> ${jonnyProfile.email}`);
        return new Response(
          JSON.stringify({ id: jonnyProfile.id, email: jonnyProfile.email }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    console.log(`No user found with username: "${username}"`);
    return new Response(
      JSON.stringify({ error: 'Username not found. Please check your username or register.' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error in Edge Function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
