
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SearchBar } from "./SearchBar";
import { UserRoleAssignmentForm } from "./UserRoleAssignmentForm";
import { UserRolesTable } from "./UserRolesTable";
import { UserWithRoles, fetchAllUsers } from "@/services/userRoleService";

export const UserRoleManagement = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const usersData = await fetchAllUsers();
    setUsers(usersData);
    setLoading(false);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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

      <UserRoleAssignmentForm 
        users={users}
        onRoleAssigned={fetchUsers}
      />

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
            <UserRolesTable 
              users={filteredUsers}
              loading={loading}
              onRoleRemoved={fetchUsers}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
