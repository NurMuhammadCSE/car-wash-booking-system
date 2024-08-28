/* eslint-disable @typescript-eslint/no-explicit-any */
// UserList.tsx
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

const UserList: React.FC = () => {
  const {
    data: users,
    isLoading,
  } = useGetAllUsersQuery(undefined);
  console.log(users);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-center">Name</TableHead>
            <TableHead className="px-4 py-2 text-center">Email</TableHead>
            <TableHead className="px-4 py-2 text-center">Role</TableHead>
            <TableHead className="px-4 py-2 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user:any) => (
            <TableRow key={user._id}>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>
              <TableCell className="text-center">
                {/* Add buttons for editing roles or other actions */}
                <Button
                  variant="link"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit Role
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
