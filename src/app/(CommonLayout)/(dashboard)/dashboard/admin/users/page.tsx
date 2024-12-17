"use client";
import React from "react";
import {
  useChangeRoleMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/src/redux/api/userApi";

const AllUsers: React.FC = () => {
  // Fetch all users
  const { data: userData, isLoading, error } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [changeRole] = useChangeRoleMutation();
  const users = [
    ...(userData?.data?.admins || []),
    ...(userData?.data?.vendors || []),
    ...(userData?.data?.customers || []),
  ].map((user: any) => ({
    id: user.user?.id,
    email: user.user?.email,
    role: user.user?.role,
    name: user.name || user.user?.name || "N/A",
    profilePhoto: user.profilePhoto || null,
    contactNumber: user.contactNumber || "N/A",
  }));

  console.log(users);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // Handle role change
  const handleChangeRole = async (id: string, newRole: string) => {
    try {
      await changeRole({ id, role: newRole });
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      console.error("Error changing role:", err);
      alert("Failed to change user role.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users: {JSON.stringify(error)}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {/* Delete Button */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleDelete(user.id)}>
                  Delete
                </button>

                {/* Role Change Dropdown */}
                <select
                  className="border border-gray-400 rounded p-1"
                  defaultValue={user.role}
                  onChange={(e) => handleChangeRole(user.id, e.target.value)}>
                  <option value="ADMIN">Admin</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="CUSTOMER">Customer</option>
                </select>
              </td>
            </tr>
          ))}

          {/* Handle empty list */}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 p-2 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
