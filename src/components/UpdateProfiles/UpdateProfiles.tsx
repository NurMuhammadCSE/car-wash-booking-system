import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">User Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>

        {editMode ? (
          <div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 mr-4">
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">
              <strong>User ID:</strong> {user?.userId}
            </p>
            <p className="text-lg mb-2">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Role:</strong> {user?.role}
            </p>
            {/* <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-[#30415A] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update user
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
