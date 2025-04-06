
import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { AuthContextType, User } from './types';
import { useTranslation } from '@/contexts/translation/TranslationContext';

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get current session
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email,
            name: data.session.user.user_metadata?.name,
            username: data.session.user.user_metadata?.username,
            avatar_url: data.session.user.user_metadata?.avatar_url
          });
          
          // Check if user has admin role
          await checkAdminRole(data.session.user.id);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.info("Auth state changed:", event, {
        _type: session ? typeof session : "undefined",
        value: session ? JSON.stringify(session) : "undefined"
      });

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name,
          username: session.user.user_metadata?.username,
          avatar_url: session.user.user_metadata?.avatar_url
        });
        
        // Check if user has admin role
        await checkAdminRole(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Check if the user has admin role
  const checkAdminRole = async (userId: string) => {
    try {
      // Using profiles table to check for admin role instead of user_roles
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) {
        console.error("Error checking admin role:", error);
        return;
      }
      
      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data?.user && !data.user.user_metadata?.username) {
        navigate("/set-username");
      } else {
        navigate("/dashboard");
      }
      
      return { success: true, data };
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(t("loginError", { ns: "auth" }));
      return { success: false, error };
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      navigate("/set-username");
      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Failed to sign up");
      return { success: false, error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/");
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error(t("logoutError", { ns: "auth" }));
      return { success: false, error };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent");
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to send reset email");
      return { success: false, error };
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (updateError) throw updateError;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...updates } : null);
      
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
      return { success: false, error };
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    isAdmin,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
