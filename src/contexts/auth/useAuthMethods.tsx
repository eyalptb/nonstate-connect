
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "./types";

export const useAuthMethods = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get current user data
  const getUser = async (): Promise<User | null> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Error getting user:", error);
        return null;
      }
      
      if (!user) return null;
      
      // Get additional profile data from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, role')
        .eq('id', user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
      }
      
      return {
        id: user.id,
        email: user.email,
        username: profile?.username || user.email?.split('@')[0],
        roles: profile?.role ? [profile.role] : ["user"]
      };
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  };

  // Sign in with email/username and password
  const signIn = async ({ identifier, password }: { identifier: string; password: string }) => {
    try {
      setLoading(true);
      
      let email = identifier;
      
      // Check if identifier is a username rather than email
      if (!identifier.includes('@')) {
        const { data, error: usernameError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', identifier)
          .maybeSingle();
        
        if (usernameError || !data) {
          return { error: new Error('Invalid username or password') };
        }
        
        // Get the user's email from auth.users using admin functions via edge function
        const { data: userData, error: userError } = await supabase.functions.invoke('auth-get-user-email', {
          body: { userId: data.id }
        });
        
        if (userError || !userData?.email) {
          return { error: new Error('Failed to retrieve user information') };
        }
        
        email = userData.email;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email before signing in.');
        } else {
          toast.error('Invalid login credentials');
        }
        return { error };
      }
      
      toast.success('Signed in successfully');
      navigate('/dashboard');
      return { error: null };
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Sign in error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email, password, and optional username
  const signUp = async ({ email, password, username }: { email: string; password: string; username?: string }) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { username }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      toast.success('Registration successful! Please check your email to confirm your account.');
      return { error: null };
    } catch (error) {
      toast.error('An unexpected error occurred during sign up');
      console.error('Sign up error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      // Navigate to home page after sign out
      navigate('/');
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`
      });
      
      if (error) throw error;
      
      toast.success('Password reset email sent');
      return { success: true };
    } catch (error) {
      toast.error('Failed to send password reset email');
      console.error('Password reset error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error('Failed to get current user');
        return { success: false, error: userError || new Error('User not found') };
      }
      
      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: updates.username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update profile error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async () => {
    try {
      setLoading(true);
      
      // For security, this should be implemented through a Supabase Edge Function
      // that has the service_role key to delete users
      const { error } = await supabase.functions.invoke('delete-user', {});
      
      if (error) throw error;
      
      toast.success('Account deleted successfully');
      navigate('/');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete account');
      console.error('Delete account error:', error);
      return { success: false, error: error as Error };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        toast.error('Google sign in failed');
        console.error('Google sign in error:', error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        toast.error('Apple sign in failed');
        console.error('Apple sign in error:', error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Apple sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check username availability
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Username check error:', error);
        return false;
      }
      
      return !data; // If no data is returned, username is available
    } catch (error) {
      console.error('Username check error:', error);
      return false;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    getUser,
    resetPassword,
    updateProfile,
    deleteAccount,
    signInWithGoogle,
    signInWithApple,
    checkUsernameAvailability,
    loading
  };
};
