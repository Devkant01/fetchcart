import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginAuth() {
    const navigate = useNavigate();
    const { loading, loginWithEmail, loginWithGoogle } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const success = await loginWithEmail(email, password);
        if (success) navigate("/");
    };

    return (
        <div className="min-h-[90%] min-w-screen fixed flex flex-col items-center justify-center space-y-6 px-4">
            <h1 className="font-extrabold text-3xl scale-y-110">FetchCart</h1>
            <p className="font-semibold text-gray-400 text-xl">
                Welcome back! Enter your credentials to continue.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-lg p-8 space-y-4">

                <div>
                    <label className="block text-gray-700 mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border rounded-2xl"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="enter your secure password"
                        className="w-full px-4 py-3 border rounded-2xl"
                    />
                </div>

                <button className={`w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700  ${loading ? "cursor-progress" : "cursor-pointer"}`} disabled={loading} type="submit">
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Divider */}
                <div className="flex items-center mt-4 mb-6 gap-2">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-300" />
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
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Start for Free
                    </span>
                </p>
            </form>
        </div>
    );
}
