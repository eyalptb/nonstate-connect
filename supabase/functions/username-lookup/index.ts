
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

    // Try various formats of the username to increase chances of finding a match
    // 1. Try the original username as provided
    let { data, error } = await supabaseClient
      .from('profiles')
      .select('id, email')
      .eq('username', username)
      .maybeSingle();
    
    // 2. If not found, try with trimmed username
    if (!data && !error) {
      const trimmed = username.trim();
      console.log(`No match for original username, trying trimmed: ${trimmed}`);
      
      const result = await supabaseClient
        .from('profiles')
        .select('id, email')
        .eq('username', trimmed)
        .maybeSingle();
      
      data = result.data;
      error = result.error;
    }
    
    // 3. If still not found, try case-insensitive search
    if (!data && !error) {
      console.log('No match for trimmed username, trying case-insensitive search');
      
      const result = await supabaseClient
        .from('profiles')
        .select('id, email')
        .ilike('username', username)
        .maybeSingle();
      
      data = result.data;
      error = result.error;
    }
    
    // 4. Last resort: try with alphanumeric characters only, case insensitive
    if (!data && !error) {
      const alphanumericOnly = username.trim().replace(/[^a-zA-Z0-9]/g, '');
      console.log(`No case-insensitive match, trying alphanumeric only: ${alphanumericOnly}`);
      
      const result = await supabaseClient
        .from('profiles')
        .select('id, email')
        .ilike('username', alphanumericOnly)
        .maybeSingle();
      
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error fetching profile:', error);
      return new Response(
        JSON.stringify({ error: 'Error looking up username', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!data || !data.email) {
      console.log(`No user found with username: ${username} after multiple lookup attempts`);
      
      // Debug: Log all usernames in the profiles table
      const { data: allProfiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('username, email, id')
        .not('username', 'is', null);
      
      if (!profilesError && allProfiles) {
        console.log('Available usernames in the database:', allProfiles.map(p => `${p.username} (${p.id})`));
      } else {
        console.log('Error fetching all profiles:', profilesError);
      }
      
      return new Response(
        JSON.stringify({ error: 'Username not found. Please check your username or register.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found email for username: ${username} -> ${data.email}`);
    
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
