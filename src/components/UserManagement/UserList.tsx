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
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import Loader from "@/pages/shared/Loader/Loader";
import { Helmet } from "react-helmet-async";

const roleColors: { [key: string]: string } = {
  admin: "bg-red-500 text-white",
  user: "bg-[#30415A] text-white",
};

const UserList: React.FC = () => {
  const { token } = useAppSelector((state) => state.user);
  const { data: users, isLoading } = useGetAllUsersQuery(token);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleUpdate = async (userId: string, role: string) => {
    try {
      await updateUserRole({ userId, role, token }).unwrap();
      toast.success("Role Updated Successfully");
      // Swal.fire({
      //   title: "Success!",
      //   text: "Role updated successfully.",
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });
    } catch (error) {
      console.error("Failed to update role", error);
      // Swal.fire({
      //   title: "Error!",
      //   text: "Failed to update role.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader></Loader>{" "}
      </div>
    );
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>All Users - Car Washing</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 text-center">Name</TableHead>
            <TableHead className="px-4 py-2 text-center">Email</TableHead>
            <TableHead className="px-4 py-2 text-center">Role</TableHead>
            <TableHead className="px-4 py-2 text-center">Actions</TableHead>
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
