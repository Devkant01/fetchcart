import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateRole } from "../features/user/userSlice";

import { toastSuccess, toastError } from "../utils/toast";
import axios from "axios";

export default function AdminRequest({ open, setOpen }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const sendRequest = async () => {
        if (!password.trim()) return toastError("Please enter the admin password");

        try {
            setLoading(true);
            const res = await axios.put(
                "/user/become-admin",
                { password },
                { withCredentials: true }
            );

            dispatch(updateRole({ role: "admin" }));

            toastSuccess(res.data.message || "Request successful!");
            setTimeout(() => setOpen(false), 1200);
        } catch (err) {
            toastError(
                err.response?.data?.message || "Failed to send admin request."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="absolute inset-0 z-50 flex items-center justify-center 
               bg-black/40 backdrop-blur-sm rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        layout
                        className="bg-white w-full sm:w-[400px] min-h-full rounded-xl p-5
                   flex flex-col justify-between"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Become an Admin
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Enter the secret admin password to send a request.
                            </p>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="mt-4 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                disabled={loading}
                            />
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50
                           min-w-[85px] text-center cursor-pointer"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={sendRequest}
                                disabled={loading}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           disabled:opacity-70 min-w-[110px] text-center cursor-pointer"
                            >
                                {loading ? "Sending..." : "Send Request"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

            )}
        </AnimatePresence>
    );
}
