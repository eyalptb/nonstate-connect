
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { AppRole, UserWithRoles, assignUserRole } from "@/services/userRoleService";

interface UserRoleAssignmentFormProps {
  users: UserWithRoles[];
  onRoleAssigned: () => void;
}

export const UserRoleAssignmentForm: React.FC<UserRoleAssignmentFormProps> = ({ 
  users, 
  onRoleAssigned 
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole | "">("");

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) {
      return;
    }

    const success = await assignUserRole(selectedUser, selectedRole);
    if (success) {
      onRoleAssigned();
      setSelectedUser("");
      setSelectedRole("");
    }
  };

  return (
    <div className="bg-muted p-4 rounded-md">
      <h3 className="text-sm font-medium mb-3">Assign New Role</h3>
      <div className="flex items-end gap-4">
        <div className="w-full">
          <label className="text-xs mb-1 block">User</label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <label className="text-xs mb-1 block">Role</label>
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AppRole)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAssignRole} className="flex items-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Role
        </Button>
      </div>
    </div>
  );
};
