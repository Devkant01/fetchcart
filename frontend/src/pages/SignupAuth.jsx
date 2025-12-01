import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function SignupAuth() {
  const navigate = useNavigate();
  const { loading, signupWithEmail, loginWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const success = await signupWithEmail({ name, email, password });
    if (success) navigate("/");

  };

  return (
    <div className="min-h-[90%] min-w-screen fixed flex flex-col items-center justify-center space-y-6 px-4">

      <h1 className="font-extrabold text-3xl scale-y-110">FetchCart</h1>
      <p className="font-semibold text-gray-400 text-xl">
        Create an account to access developer tools.
      </p>

      <form onSubmit={handleSignup} className="w-full max-w-lg rounded-lg p-8 space-y-4">

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700  ${loading ? "cursor-progress" : "cursor-pointer"}`}
        >
          {loading ? "Creating Account..." : "Start for Free"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-4 mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className={`w-full py-3 flex gap-x-2 items-center justify-center border border-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.05)] backdrop-blur-md text-lg font-semibold rounded-2xl hover:bg-white/10 tracking-wide  transition-all ${loading ? "cursor-progress" : "cursor-pointer"}`}
        >
          <img width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
          Continue with Google
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
