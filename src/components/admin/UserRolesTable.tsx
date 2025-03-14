
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "lucide-react";
import { AppRole, UserWithRoles, removeUserRole } from "@/services/userRoleService";

interface UserRolesTableProps {
  users: UserWithRoles[];
  loading: boolean;
  onRoleRemoved: () => void;
}

export const UserRolesTable: React.FC<UserRolesTableProps> = ({ 
  users, 
  loading, 
  onRoleRemoved 
}) => {
  const handleRemoveRole = async (userId: string, role: AppRole) => {
    const success = await removeUserRole(userId, role);
    if (success) {
      onRoleRemoved();
    }
  };

  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-10">
          <Loader className="h-8 w-8 animate-spin mx-auto" />
        </TableCell>
      </TableRow>
    );
  }

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
          No users found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map(user => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">{user.full_name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              {user.roles.length === 0 ? (
                <span className="text-xs text-muted-foreground">No roles</span>
              ) : (
                user.roles.map((role, idx) => (
                  <Badge key={idx} variant="outline" className="flex items-center gap-1">
                    {role}
                    <button 
                      onClick={() => handleRemoveRole(user.id, role)}
                      className="ml-1 text-xs hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </TableCell>
          <TableCell>
            {new Date(user.created_at).toLocaleDateString()}
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="sm">
              Details
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
