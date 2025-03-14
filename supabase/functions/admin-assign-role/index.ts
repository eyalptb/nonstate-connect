
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase URL or Service key not found");
    }

    // Initialize the Supabase client with service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get request body
    const { userId, role, email, autoConfirm, action } = await req.json();
    
    // Handle delete user action
    if (action === "deleteUser" && userId) {
      console.log(`Request to delete user with ID: ${userId}`);
      
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) {
        console.error("Error deleting user:", error);
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      
      console.log(`Successfully deleted user with ID: ${userId}`);
      
      return new Response(
        JSON.stringify({ success: true, message: "User deleted successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Special case for auto-confirming emails (especially for admin user)
    if (autoConfirm && email) {
      console.log(`Request to auto-confirm email: ${email}`);
      
      // Get the user by email
      const { data: userData, error: findError } = await supabase
        .from('auth.users')
        .select('id, email')
        .eq('email', email)
        .maybeSingle();
      
      if (findError) {
        console.log(`Error finding user with email ${email}:`, findError);
      } else if (userData) {
        console.log(`Found user with email ${email}, id: ${userData.id}`);
        
        // Try to confirm the email
        const { error: confirmError } = await supabase.auth.admin.updateUserById(
          userData.id,
          { email_confirm: true }
        );
        
        if (confirmError) {
          console.error("Error confirming email:", confirmError);
        } else {
          console.log(`Successfully confirmed email for ${email}`);
          
          // If no role provided but this is the admin email, assume admin role
          if (!role && email === '016eyal@gmail.com') {
            role = 'admin';
            userId = userData.id;
            console.log(`Auto-assigning admin role to confirmed admin email user`);
          }
        }
      } else {
        console.log(`No user found with email ${email}`);
      }
    }

    // Continue with role assignment if we have the necessary data
    if (!userId || !role) {
      return new Response(
        JSON.stringify({ 
          error: "User ID and role are required for role assignment",
          action: "email_confirmation_attempted"
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // First check if the role exists already
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', role)
      .maybeSingle();

    // If role already exists, just return success
    if (existingRole) {
      return new Response(
        JSON.stringify({ success: true, message: "Role already assigned" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Insert the role assignment
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert([{ user_id: userId, role }]);

    if (insertError) {
      console.error("Error assigning role:", insertError);
      throw new Error(`Failed to assign role: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
  } catch (error) {
    console.error("Error in admin-assign-role function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
