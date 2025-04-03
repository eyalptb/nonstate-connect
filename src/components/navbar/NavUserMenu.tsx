
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useTranslation } from "react-i18next";
import { 
  Avatar, 
  AvatarFallback 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, Shield } from "lucide-react";
import { toast } from "sonner";

export function NavUserMenu() {
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useTranslation(["auth", "navigation"]);
  
  const getUserInitials = () => {
    if (!user) return "U";
    
    if (user.username) {
      return user.username.substring(0, 1).toUpperCase();
    }
    
    if (user.name) {
      return user.name.substring(0, 1).toUpperCase();
    }
    
    if (user.email) {
      return user.email.substring(0, 1).toUpperCase();
    }
    
    return "U";
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t("logoutSuccess", { ns: "auth" }));
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error(t("logoutError", { ns: "auth" }));
    }
  };

  if (!user) {
    return (
      <Button asChild variant="default" size="sm">
        <Link to="/sign-in">{t("signIn", { ns: "auth" })}</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.username || user.email}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>{t("profile", { ns: "navigation" })}</span>
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>{t("admin", { ns: "navigation" })}</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings", { ns: "navigation" })}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("signOut", { ns: "auth" })}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Remove the standalone sign out button - it's redundant and might be causing confusion */}
    </div>
  );
}
