import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../utils/toast";
import axios from "axios";

export default function SignupAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError("");

    try {
      const res = await axios.post("/user/signup", { name, email, password }, { withCredentials: true });
      
      toastSuccess(res.data.message || "Account created successfully");

      dispatch(login({
        isLoggedIn: true,
        name: res.data.name,
        role: res.data.role,
        email: res.data.email,
      }));

    } catch (err) {
      toastError(err.response?.data?.message || "Signup failed");
      // setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90%] min-w-screen fixed flex flex-col items-center justify-center space-y-6 px-4">
      <h1 className="font-extrabold text-3xl scale-y-110 ">FetchCart</h1>
      <p className="font-semibold text-gray-400 text-xl">Create an account to access developer tools.</p>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-lg rounded-lg p-8 space-y-4"
      >

        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a secure password"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 transition-all ${loading ? " cursor-progress" : "cursor-pointer"}`}
        >
          {loading ? "Creating Account..." : "Start for Free"}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
