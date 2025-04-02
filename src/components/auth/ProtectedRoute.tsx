
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Loader } from "lucide-react";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRoles?: string[];
};

export function ProtectedRoute({ 
  children,
  requiredRoles = [] 
}: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // If we're still loading auth state, don't make a decision yet
    if (loading) {
      return;
    }

    // User is not logged in
    if (!user) {
      setIsAuthorized(false);
      return;
    }

    // If no specific roles are required, just being authenticated is enough
    if (requiredRoles.length === 0) {
      setIsAuthorized(true);
      return;
    }

    // Check if user has required roles
    // For now, we only have the "admin" role in the system
    const hasRequiredRole = requiredRoles.includes("admin") ? isAdmin : true;
    setIsAuthorized(hasRequiredRole);
  }, [user, loading, isAdmin, requiredRoles]);

  // Show loading state while we determine authorization
  if (loading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to sign in if not authorized
  if (!isAuthorized) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  // User is authorized, render the children
  return <>{children}</>;
}
