
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

    // Normalize username: trim whitespace and convert to lowercase for consistent comparison
    const normalizedUsername = username.trim().toLowerCase();
    
    console.log(`Looking up email for normalized username: "${normalizedUsername}"`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    console.log('Creating Supabase client with URL:', supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    try {
      // Check for the username with case-insensitive match using ilike
      console.log(`Checking for username with case-insensitive match: "${normalizedUsername}"`);
      
      // First attempt with direct match on lowercase username
      const { data: profileData, error: profileError } = await supabaseClient
        .from('profiles')
        .select('id, username')
        .ilike('username', username.trim())
        .maybeSingle();
      
      console.log('Profile query response:', { profileData, profileError });
      
      if (profileError) {
        console.error('Error fetching profiles by username:', profileError);
        return new Response(
          JSON.stringify({ error: 'Failed to query profiles', details: profileError }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // If no match, try a more flexible search
      if (!profileData) {
        console.log(`No exact match found, trying with more flexible search`);
        const { data: flexibleMatchData, error: flexibleMatchError } = await supabaseClient
          .from('profiles')
          .select('id, username')
          .ilike('username', `%${normalizedUsername}%`)
          .order('username', { ascending: true })
          .limit(5);
          
        console.log('Flexible search results:', { flexibleMatchData, flexibleMatchError });
        
        if (flexibleMatchError) {
          console.error('Error in flexible search:', flexibleMatchError);
        } else if (flexibleMatchData && flexibleMatchData.length > 0) {
          console.log('Found potential matches:', flexibleMatchData.map(p => p.username).join(', '));
        } else {
          console.log('No potential matches found');
        }
      }
      
      if (profileData) {
        console.log(`Found matching profile: id=${profileData.id}, username=${profileData.username}`);
        
        // Get the email for this user ID from auth.users table
        const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(profileData.id);
        
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
      }
      
      // Log all profiles for debugging purposes
      const { data: allProfiles, error: allProfilesError } = await supabaseClient
        .from('profiles')
        .select('id, username')
        .limit(20);
      
      if (allProfilesError) {
        console.error('Error fetching all profiles:', allProfilesError);
      }
      
      // Log the first few profiles for debugging
      if (allProfiles && allProfiles.length > 0) {
        console.log(`Found ${allProfiles.length} profiles total`);
        console.log('Sample profiles:');
        allProfiles.forEach(p => console.log(`- ${p.id}: ${p.username || 'no username'}`));
        
        // Log if there's any profile that might match with different case sensitivity
        const potentialMatches = allProfiles.filter(p => 
          p.username && p.username.toLowerCase() === normalizedUsername
        );
        
        if (potentialMatches.length > 0) {
          console.log('Potential case-insensitive matches:');
          potentialMatches.forEach(p => console.log(`- ${p.id}: ${p.username}`));
        }
      } else {
        console.log('No profiles found in database');
      }
      
      console.log(`No user found with username: "${username}"`);
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
