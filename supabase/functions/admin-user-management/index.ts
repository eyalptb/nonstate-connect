
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
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create a Supabase client with the auth header
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Get the user from the client
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: adminCheck, error: adminCheckError } = await supabaseClient.rpc(
      'user_has_role',
      { _user_id: user.id, _role: 'admin' }
    )

    if (adminCheckError || !adminCheck) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the request body
    const { action, ...params } = await req.json()
    
    console.log(`Admin user ${user.id} is attempting action: ${action}`)
    
    let result;
    
    // Perform the requested action
    switch (action) {
      case 'createUser':
        // Required parameters: email, password, firstName, lastName, username, role
        const { email, password, firstName, lastName, username, role } = params
        result = await supabaseClient.rpc(
          'admin.create_user', 
          { 
            admin_id: user.id,
            new_email: email,
            new_password: password,
            new_first_name: firstName,
            new_last_name: lastName,
            new_username: username,
            assign_role: role || 'user'
          }
        )
        break
        
      case 'deleteUser':
        // Required parameters: userId
        const { userId } = params
        result = await supabaseClient.rpc(
          'admin.delete_user',
          {
            admin_id: user.id,
            user_id_to_delete: userId
          }
        )
        break
        
      case 'updateUser':
        // Required parameters: userId, optional: email, firstName, lastName, username
        const { userId: updateUserId, email: newEmail, firstName: newFirstName, lastName: newLastName, username: newUsername } = params
        result = await supabaseClient.rpc(
          'admin.update_user',
          {
            admin_id: user.id,
            user_id_to_update: updateUserId,
            new_email: newEmail,
            new_first_name: newFirstName,
            new_last_name: newLastName,
            new_username: newUsername
          }
        )
        break
        
      case 'resetPassword':
        // Required parameters: userId, newPassword
        const { userId: resetUserId, newPassword } = params
        result = await supabaseClient.rpc(
          'admin.reset_user_password',
          {
            admin_id: user.id,
            user_id_to_update: resetUserId,
            new_password: newPassword
          }
        )
        break
        
      case 'listUsers':
        // This uses standard Supabase admin API
        const { data: authUsers, error: authError } = await supabaseClient.auth.admin.listUsers()
        
        if (authError) {
          throw authError
        }
        
        // Get profiles for these users
        const { data: profiles, error: profilesError } = await supabaseClient
          .from('profiles')
          .select('*')
        
        if (profilesError) {
          throw profilesError
        }
        
        // Get roles for these users
        const { data: roles, error: rolesError } = await supabaseClient
          .from('user_roles')
          .select('*')
        
        if (rolesError) {
          throw rolesError
        }
        
        // Combine the data
        const users = authUsers.users.map(authUser => {
          const profile = profiles.find(p => p.id === authUser.id) || {}
          const userRoles = roles.filter(r => r.user_id === authUser.id).map(r => r.role)
          
          return {
            id: authUser.id,
            email: authUser.email,
            created_at: authUser.created_at,
            first_name: profile.first_name || authUser.user_metadata?.first_name,
            last_name: profile.last_name || authUser.user_metadata?.last_name,
            username: authUser.user_metadata?.username,
            roles: userRoles
          }
        })
        
        result = { data: users, success: true }
        break
        
      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
    
    console.log(`Action ${action} result:`, result)
    
    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error in admin-user-management function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
