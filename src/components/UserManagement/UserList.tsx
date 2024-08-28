/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/api/usersApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const roleColors: { [key: string]: string } = {
  admin: "bg-red-500 text-white",
  user: "bg-blue-500 text-white",
};

const UserList: React.FC = () => {
  const { data: users, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleUpdate = async (userId: string, role: string) => {
    try {
      await updateUserRole({ userId, role }).unwrap();
      console.log("Role updated successfully");
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow  className="bg-gray-100">
            <TableHead className="px-4 py-2 text-center">Name</TableHead>
            <TableHead className="px-4 py-2 text-center">Email</TableHead>
            <TableHead className="px-4 py-2 text-center">Role</TableHead>
            <TableHead className="px-4 py-2 er">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">
                <span className={`px-2 py-1 rounded ${roleColors[user.role]}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Select
                  onValueChange={(value) => handleRoleUpdate(user._id, value)}
                  defaultValue={user.role}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
