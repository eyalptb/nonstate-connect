
import React, { useEffect, useState } from 'react';
import { AuthContext } from './types';
import type { User, AuthContextType } from './types';
import { useAuthMethods } from './useAuthMethods';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("AuthProvider initializing"); // Debug log
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const { 
    signIn, 
    signUp, 
    signOut: authMethodsSignOut,
    signInWithGoogle,
    signInWithApple,
    checkUsernameAvailability,
    loading: authMethodsLoading
  } = useAuthMethods();
  
  // Get current user function
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
        .maybeSingle();
      
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

  // Reset password function
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
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("Initializing auth state"); // Debug log
        const userData = await getUser();
        if (userData) {
          setUser(userData);
          setIsAdmin(userData.roles?.includes('admin') || false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (session) {
          const userData = await getUser();
          setUser(userData);
          setIsAdmin(userData?.roles?.includes('admin') || false);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );
    
    initAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Create an object with the properly typed methods
  const signInWithEmail = async (email: string, password: string) => {
    const result = await signIn({ identifier: email, password });
    return { success: !result.error, error: result.error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const result = await signUp({ email, password });
    return { success: !result.error, error: result.error };
  };
  
  // Create a wrapper for signOut to match expected return type
  const handleSignOut = async () => {
    const result = await authMethodsSignOut();
    return { success: !result.error, error: result.error };
  };
  
  const authContext: AuthContextType = {
    user,
    loading: loading || authMethodsLoading,
    isAdmin,
    signInWithEmail,
    signUpWithEmail,
    signOut: handleSignOut,
    resetPassword,
    updateProfile,
  };
  
  console.log("Auth state:", { user: user?.id || "none", loading, isAdmin }); // Debug log
  
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
