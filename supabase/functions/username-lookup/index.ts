
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
    
    console.log(`Retrieved ${profileData?.length || 0} profiles from database (direct match)`);
    
    // If direct match found, return it
    if (profileData && profileData.length > 0) {
      const matchedProfile = profileData[0];
      console.log(`Found profile for username: "${username}" -> ${matchedProfile.email}`);
      
      return new Response(
        JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // If no direct match, fetch all profiles and try more flexible matching
    const { data: allProfiles, error: allProfilesError } = await supabaseClient
      .from('profiles')
      .select('id, email, username');
    
    if (allProfilesError) {
      console.error('Error fetching all profiles:', allProfilesError);
      return new Response(
        JSON.stringify({ error: 'Failed to query all profiles', details: allProfilesError }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Retrieved ${allProfiles?.length || 0} total profiles from database`);
    
    // Log all usernames for debugging
    if (allProfiles && allProfiles.length > 0) {
      console.log('All profiles in database:');
      allProfiles.forEach(profile => {
        console.log(`Profile: username="${profile.username}", email=${profile.email}, id=${profile.id}`);
      });
    } else {
      console.log('No profiles found in the database');
      // Return a 200 response with an error message in the body
      return new Response(
        JSON.stringify({ error: 'No profiles found in the database' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Try multiple matching approaches
    const normalizedUsername = username.toLowerCase().trim();
    
    // Special handling for jonnyCat with various case options
    if (normalizedUsername === "jonnycat") {
      // Try all possible case variations for jonnycat
      const jonnyVariations = ["jonnycat", "JonnyCat", "jonnyCat", "JONNYCAT"];
      
      for (const variation of jonnyVariations) {
        const jonnyMatch = allProfiles.find(profile => 
          profile.username && profile.username === variation
        );
        
        if (jonnyMatch) {
          console.log(`Found special jonnycat match: "${jonnyMatch.username}" -> ${jonnyMatch.email}`);
          return new Response(
            JSON.stringify({ id: jonnyMatch.id, email: jonnyMatch.email }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }
    
    // Try case-insensitive exact match
    let matchedProfile = allProfiles.find(profile => 
      profile.username && profile.username.toLowerCase() === normalizedUsername
    );
    
    if (matchedProfile) {
      console.log(`Found case-insensitive match: "${matchedProfile.username}" -> ${matchedProfile.email}`);
      return new Response(
        JSON.stringify({ id: matchedProfile.id, email: matchedProfile.email }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Try partial match (contains)
    matchedProfile = allProfiles.find(profile => 
      profile.username && profile.username.toLowerCase().includes(normalizedUsername)
    );
    
    if (matchedProfile) {
      console.log(`Found partial match: "${matchedProfile.username}" -> ${matchedProfile.email}`);
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
