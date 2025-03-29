
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

    // Normalize username: trim whitespace 
    const normalizedUsername = username.trim();
    
    console.log(`Looking up user with normalized username: "${normalizedUsername}"`);
    
    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Creating Supabase admin client with service role');
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    try {
      // Use case-insensitive search with admin privileges
      console.log(`Searching for username: "${normalizedUsername}" (case insensitive)`);
      
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('id, username')
        .ilike('username', normalizedUsername)
        .maybeSingle();
      
      console.log('Profile query response:', { profileData, profileError });
      
      if (profileError) {
        console.error('Error fetching profiles by username:', profileError);
        return new Response(
          JSON.stringify({ error: 'Failed to query profiles', details: profileError }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (!profileData) {
        console.log(`No user found with username: "${normalizedUsername}"`);
        return new Response(
          JSON.stringify({ error: 'Username not found' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`Found matching profile: id=${profileData.id}, username=${profileData.username}`);
      
      // Get the email for this user ID from auth.users table using admin functions
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(profileData.id);
      
      if (userError || !userData?.user?.email) {
        console.error('Error fetching user email:', userError || 'No email found');
        return new Response(
          JSON.stringify({ error: 'Failed to fetch user email', details: userError }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`Found email for username "${profileData.username}": ${userData.user.email}`);
      
      return new Response(
        JSON.stringify({ id: profileData.id, email: userData.user.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ 
          error: 'Database error occurred. Please try with email instead.',
          details: dbError.message
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Unexpected error in Edge Function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
