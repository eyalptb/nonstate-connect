
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

    console.log(`Looking up email for username: ${username}`);
    
    // DIRECT QUERY APPROACH
    // This avoids any issues with the profiles table schema or RLS policies
    const { data: directData, error: directError } = await supabaseClient
      .from('profiles')
      .select('*');
    
    console.log('All profiles in database:', directData);
    
    // Look for the username in the returned data manually
    let matchedProfile = null;
    if (directData && directData.length > 0) {
      // Case-insensitive comparison
      matchedProfile = directData.find(profile => 
        profile.username && profile.username.toLowerCase() === username.toLowerCase()
      );
      
      if (!matchedProfile) {
        console.log('No exact match found, checking for partial matches...');
        // Try trimmed version
        matchedProfile = directData.find(profile => 
          profile.username && profile.username.trim().toLowerCase() === username.trim().toLowerCase()
        );
      }
      
      if (!matchedProfile) {
        console.log('No partial match found, checking if username is contained...');
        // Check if any username contains this username
        matchedProfile = directData.find(profile => 
          profile.username && profile.username.toLowerCase().includes(username.toLowerCase())
        );
      }
    }
    
    if (directError) {
      console.error('Error fetching all profiles:', directError);
    }
    
    if (!matchedProfile) {
      console.log(`No user found with username: ${username} in ${directData?.length || 0} profiles`);
      
      if (directData && directData.length > 0) {
        console.log('Available usernames in the database:');
        directData.forEach(profile => {
          console.log(`- Username: ${profile.username || 'null'}, Email: ${profile.email || 'null'}, ID: ${profile.id || 'null'}`);
        });
      } else {
        console.log('No profiles found in the database');
      }
      
      return new Response(
        JSON.stringify({ error: 'Username not found. Please check your username or register.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found profile for username: ${username} -> ${matchedProfile.email}`);
    
    if (!matchedProfile.email) {
      console.error(`Profile found for username ${username} but email is missing`);
      return new Response(
        JSON.stringify({ error: 'Username found but email is missing. Please contact support.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Return the email associated with this username
    return new Response(
      JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
