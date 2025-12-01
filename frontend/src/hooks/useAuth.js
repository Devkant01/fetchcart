import { useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { toastSuccess, toastError } from "../utils/toast";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";

export default function useAuth() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // --------------------------
    // Email/Password LOGIN
    // --------------------------
    const loginWithEmail = async (email, password) => {
        setLoading(true);

        try {
            const res = await axios.post(
                `/user/signin`,
                { email, password },
                { withCredentials: true }
            );

            toastSuccess("Logged in successfully");

            dispatch(
                login({
                    isLoggedIn: true,
                    name: res.data.name,
                    role: res.data.role,
                    email: res.data.email,
                })
            );

            return true;
        } catch (err) {
            toastError(err.response?.data?.message || "Login failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // --------------------------
    // Email/Password SIGNUP
    // --------------------------
    const signupWithEmail = async (formData) => {
        setLoading(true);
        try {
            const res = await axios.post(`/user/signup`, formData, {
                withCredentials: true,
            });

            toastSuccess("Account created successfully");

            dispatch(
                login({
                    isLoggedIn: true,
                    name: res.data.name,
                    role: res.data.role,
                    email: res.data.email,
                })
            );

            return true;
        } catch (err) {
            toastError(err.response?.data?.message || "Signup failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // --------------------------
    // Google Login / Signup
    // --------------------------
    const loginWithGoogle = async () => {
        try {
            googleProvider.setCustomParameters({
                prompt: "select_account",
            });
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const token = await user.getIdToken();

            const res = await axios.post(
                `/user/google-login`,
                { token },
                { withCredentials: true }
            );

            toastSuccess("Logged in successfully");

            dispatch(
                login({
                    isLoggedIn: true,
                    name: res.data.name,
                    role: res.data.role,
                    email: res.data.email,
                })
            );

            return true;
        } catch (err) {
            toastError("Google login failed");
            return false;
        }
    };

    return {
        loading,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
    };
}
