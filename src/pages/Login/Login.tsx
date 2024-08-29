import { useLoginMutation } from "@/redux/api/authApi";
import { setLoginEmail, setLoginPassword } from "@/redux/features/loginSlice";
import { setToken, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.login);

  const [Login] = useLoginMutation();

  // const { token } = useAppSelector((state: RootState) => state.user);
  // console.log("token", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await Login({ email, password });

    const { token } = data;

    const user = jwtDecode(token);

    // console.log("token", token, "user:", user);
    dispatch(setToken(token));
    dispatch(setUser(user));
    toast.success("User Login Successfully")
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#30415A] via-[#3D6D8D] to-[#4A9BB5]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-[#30415A]">
          Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => dispatch(setLoginEmail(e.target.value))}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setLoginPassword(e.target.value))}
              required
              className="mt-1 block w-full dark:text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/signup"
                className="font-medium text-[#30415A] hover:text-[#3D6D8D]"
              >
                New here? Register now
              </Link>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#30415A] hover:text-[#3D6D8D]"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#30415A] hover:bg-[#3D6D8D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A9BB5]"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
