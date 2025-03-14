
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

console.log("Edge function loaded: username-lookup");

serve(async (req) => {
  console.log("Request received:", req.method, req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    console.log('Creating Supabase client with URL:', supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get username from request body
    const requestBody = await req.json();
    const { username } = requestBody;
    
    console.log('Request body:', requestBody);
    
    if (!username) {
      console.log('No username provided in request');
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Looking up email for username: "${username}"`);
    
    // Check if there are any profiles at all
    const { data: allProfiles, error: allProfilesError } = await supabaseClient
      .from('profiles')
      .select('id, email, username')
      .limit(10);
    
    if (allProfilesError) {
      console.error('Error fetching profiles:', allProfilesError);
      return new Response(
        JSON.stringify({ error: 'Failed to query profiles', details: allProfilesError }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Log the first few profiles for debugging
    console.log(`Found ${allProfiles?.length || 0} profiles total`);
    if (allProfiles && allProfiles.length > 0) {
      console.log('Sample profiles:');
      allProfiles.slice(0, 5).forEach(p => console.log(`- ${p.id}: ${p.email} (${p.username || 'no username'})`));
    } else {
      console.log('No profiles found in database');
    }
    
    // Try direct match first
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('id, email, username')
      .ilike('username', username);
    
    if (profileError) {
      console.error('Error fetching profiles:', profileError);
      return new Response(
        JSON.stringify({ error: 'Failed to query profiles', details: profileError }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Retrieved ${profileData?.length || 0} profiles matching username "${username}"`);
    
    // If direct match found, return it
    if (profileData && profileData.length > 0) {
      const matchedProfile = profileData[0];
      console.log(`Found profile for username: "${username}" -> ${matchedProfile.email}`);
      
      return new Response(
        JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`No user found with username: "${username}"`);
    return new Response(
      JSON.stringify({ 
        error: 'Username not found. Please check your username or register.',
        profilesExist: allProfiles && allProfiles.length > 0
      }),
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
