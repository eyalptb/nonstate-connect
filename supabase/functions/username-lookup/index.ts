
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

    // Trim whitespace and convert to lowercase for consistent comparison
    const normalizedUsername = username.trim();
    
    console.log(`Looking up email for username: "${normalizedUsername}"`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    console.log('Creating Supabase client with URL:', supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    try {
      // First check if the normalized username exists (case insensitive)
      console.log(`Checking for username with case-insensitive match: "${normalizedUsername}"`);
      const { data: profileData, error: profileError } = await supabaseClient
        .from('profiles')
        .select('id, username')
        .ilike('username', normalizedUsername);
      
      if (profileError) {
        console.error('Error fetching profiles by username:', profileError);
        return new Response(
          JSON.stringify({ error: 'Failed to query profiles', details: profileError }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log(`Found ${profileData?.length || 0} profiles matching username "${normalizedUsername}" with case-insensitive match`);
      
      if (profileData && profileData.length > 0) {
        // Found matching profiles, log them for debugging
        profileData.forEach((profile, i) => {
          console.log(`Match ${i + 1}: id=${profile.id}, username=${profile.username}`);
        });
        
        // Use the first match
        const matchedProfile = profileData[0];
        console.log(`Using first match: id=${matchedProfile.id}, username=${matchedProfile.username}`);
        
        // Get the email for this user ID from auth.users table via the profiles table
        const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(matchedProfile.id);
        
        if (userError || !userData?.user?.email) {
          console.error('Error fetching user email:', userError || 'No email found');
          return new Response(
            JSON.stringify({ error: 'Failed to fetch user email', details: userError }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        console.log(`Found email for username "${matchedProfile.username}": ${userData.user.email}`);
        
        return new Response(
          JSON.stringify({ id: matchedProfile.id, email: userData.user.email }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // If no match found, check if there are any profiles at all
      const { data: allProfiles, error: allProfilesError } = await supabaseClient
        .from('profiles')
        .select('id, username')
        .limit(10);
      
      if (allProfilesError) {
        console.error('Error fetching all profiles:', allProfilesError);
      }
      
      // Log the first few profiles for debugging
      console.log(`Found ${allProfiles?.length || 0} profiles total`);
      if (allProfiles && allProfiles.length > 0) {
        console.log('Sample profiles:');
        allProfiles.slice(0, 5).forEach(p => console.log(`- ${p.id}: ${p.username || 'no username'}`));
      } else {
        console.log('No profiles found in database');
      }
      
      console.log(`No user found with username: "${normalizedUsername}"`);
      return new Response(
        JSON.stringify({ 
          error: 'Username not found. Please check your username or register.',
          profilesExist: allProfiles && allProfiles.length > 0
        }),
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
