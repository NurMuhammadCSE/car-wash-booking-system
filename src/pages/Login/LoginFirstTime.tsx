import { useLoginMutation } from "@/redux/api/authApi";
import { setLoginEmail, setLoginPassword } from "@/redux/features/loginSlice";
import { setToken, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.login);

  const [Login] = useLoginMutation();

  // const { token } = useAppSelector((state: RootState) => state.user);
  // console.log("token", token);
  type Inputs = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const user = await Login(loginInfo);
      const err = user?.error as { data?: { message?: string } };
      // console.log(err?.data?.message);

      if (err?.data?.message === "User Not Found") {
        toast.error("User Not Found");
      } else if (err?.data?.message === "Password Not Matched") {
        toast.error("Password Not Matched");
      } else {
        toast.success("User Login Successfully");
        const { token } = user.data;
        const userToken = jwtDecode(token);
        // console.log("token: ", token, "user: ", user, "UserToken: ", userToken);
        dispatch(setToken(token));
        dispatch(setUser(userToken));
        navigate("/"); // Redirect to login on success
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! First Time
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { data } = await Login({ email, password });

  //   const { token } = data;

  //   const user = jwtDecode(token);

  //   // console.log("token", token, "user:", user);
  //   dispatch(setToken(token));
  //   dispatch(setUser(user));
  //   toast.success("User Login Successfully")
  //   navigate("/");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#30415A] via-[#3D6D8D] to-[#4A9BB5]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-[#30415A]">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              {...register("email", { required: true })}
              onChange={(e) => dispatch(setLoginEmail(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
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
              {...register("password", { required: true })}
              onChange={(e) => dispatch(setLoginPassword(e.target.value))}
              className="mt-1 block w-full dark:text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
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
