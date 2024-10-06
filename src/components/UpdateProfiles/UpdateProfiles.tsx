import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // User avatar (dummy or replace with real avatar URL from profile)
  const userAvatar = "https://avatar.iran.liara.run/public";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#30415A]">
        User Dashboard
      </h1>

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2">
          <div className="flex items-center justify-center mb-6">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-[#30415A]"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-4">
            {editMode ? "Edit Profile" : "Account Information"}
          </h2>

          {editMode ? (
            <div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border-2 border-[#30415A] rounded-lg focus:ring-2 focus:ring-[#30415A] focus:outline-none transition"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-2 border-[#30415A] rounded-lg focus:ring-2 focus:ring-[#30415A] focus:outline-none transition"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300">
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-4">
                <strong>User ID:</strong> {user?.userId}
              </p>
              <p className="text-lg mb-4">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="text-lg mb-4">
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="text-lg mb-4">
                <strong>Role:</strong> {user?.role}
              </p>
              {/* <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-[#233344] transition duration-300"
              >
                Edit Profile
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
