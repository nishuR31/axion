import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { KeyRound } from "lucide-react";
import { BASE_URL } from "..";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.table(res);

      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
      setUser({
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="mx-auto min-w-96 transition-all delay-[2s] ease-in">
      <div className="w-full p-6 bg-transparent border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-blur-sm bg-opacity-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize hover:underline animate-bounce">
          Login
        </h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-gray-900 label-text">
                Username
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full h-10 p-2 border-none rounded-md outline-none bg-black/50"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="p-2 label">
              <span className="text-base font-bold text-gray-900 label-text">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full h-10 p-2 border-none rounded-md outline-none bg-black/50"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="my-2 text-center text-gray-900">
            Don't have an account?{" "}
            <Link to="/signup" className="hover:font-bold hover:underline">
              {" "}
              signup{" "}
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="mt-2 text-gray-200 border btn btn-block btn-sm border-slate-700"
            >
              Login
              <KeyRound className=" text-slate-600 hover:text-slate-200" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
