
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

    // Sanitize the username - convert to lowercase and remove special characters
    const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    console.log(`Sanitized username for lookup: ${sanitizedUsername}`);

    // First try exact match (case-sensitive)
    let { data, error } = await supabaseClient
      .from('profiles')
      .select('id, email')
      .eq('username', username)
      .maybeSingle();

    // If no match found, try with the sanitized version
    if (!data && !error) {
      console.log(`No exact match found, trying with sanitized username: ${sanitizedUsername}`);
      
      const { data: sanitizedData, error: sanitizedError } = await supabaseClient
        .from('profiles')
        .select('id, email')
        .ilike('username', sanitizedUsername)
        .maybeSingle();
      
      data = sanitizedData;
      error = sanitizedError;
    }

    if (error) {
      console.error('Error fetching profile:', error);
      return new Response(
        JSON.stringify({ error: 'Error looking up username', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!data || !data.email) {
      console.log(`No user found with username: ${username} or sanitized: ${sanitizedUsername}`);
      
      // Log all usernames in the profiles table for debugging
      const { data: allProfiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('username')
        .not('username', 'is', null);
      
      if (!profilesError && allProfiles) {
        console.log('Available usernames in the database:', allProfiles.map(p => p.username));
      }
      
      return new Response(
        JSON.stringify({ error: 'Username not found or email is missing' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found email for username: ${data.email}`);
    
    // Return the email associated with this username
    return new Response(
      JSON.stringify({ id: data.id, email: data.email }),
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
