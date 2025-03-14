
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader, Search, UserPlus, RefreshCw } from "lucide-react";

type AppRole = 'admin' | 'user';

type UserWithRoles = {
  id: string;
  email: string;
  created_at: string;
  full_name: string;
  roles: AppRole[];
};

export const UserRoleManagement = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole | "">("");
  const [selectedUser, setSelectedUser] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users from the profiles table
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, created_at');

      if (usersError) throw usersError;

      // For each user, fetch their email from auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;

      // For each user, fetch their roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const combinedUsers = usersData.map(profile => {
        const authUser = authUsers?.users.find(u => u.id === profile.id);
        const userRoles = rolesData
          .filter(r => r.user_id === profile.id)
          .map(r => r.role as AppRole);
        
        return {
          id: profile.id,
          email: authUser?.email || 'Unknown',
          created_at: profile.created_at,
          full_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A',
          roles: userRoles,
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.full_name.toLowerCase().includes(searchLower)
    );
  });

  const assignRole = async () => {
    if (!selectedUser || !selectedRole) {
      toast.error('Please select both a user and a role');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUser,
          role: selectedRole as AppRole
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('User already has this role');
        } else {
          throw error;
        }
      } else {
        toast.success(`Role ${selectedRole} assigned successfully`);
        fetchUsers(); // Refresh the user list
        setSelectedUser('');
        setSelectedRole('');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error('Failed to assign role');
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;
      
      toast.success(`Role ${role} removed successfully`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error('Failed to remove role');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>

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
          <Button onClick={assignRole} className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Role
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader className="h-8 w-8 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
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
                              onClick={() => removeRole(user.id, role)}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
