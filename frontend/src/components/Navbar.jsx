import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import AdminRequest from "../components/AdminRequest";
import { toastSuccess, toastError, toastInfo } from "../utils/toast";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, checking, name, role, email } = useSelector((state) => state.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [signingOut, setSigningOut] = useState(false);

    const baseUrl = import.meta.env.VITE_BACKEND_URL || "";
    if (baseUrl) axios.defaults.baseURL = baseUrl;

    const handleLogout = async () => {
        try {
            setSigningOut(true);
            await axios.get("/user/logout", { withCredentials: true });
            toastSuccess("Logged out successfully");
        } catch (e) {
            toastError("Logout failed. Please try again.");
        } finally {
            dispatch(logout());
            navigate("/");
            setSigningOut(false);
        }
    };


    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="w-full bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 h-20 transition-all duration-200">
            <div className="max-w-[85%] mx-auto flex items-center justify-between h-full px-2">
                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="text-2xl md:text-3xl font-bold text-blue-600 cursor-pointer select-none"
                >
                    Fetch<span className="text-gray-800">Cart</span>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                {/* Nav links */}
                <div
                    className={`${menuOpen
                        ? "flex flex-col absolute top-[60px] left-0 w-full bg-white shadow-md"
                        : "hidden"
                        } md:flex md:flex-row md:items-center md:gap-6 text-gray-700 md:static text-xl md:text-2xl font-semibold`}
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-2 hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                            }`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/docs"
                        className={({ isActive }) =>
                            `px-3 py-2 hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                            }`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Docs
                    </NavLink>

                    {/* ---- Conditional Part ---- */}
                    {checking ? (
                        // While Startup is verifying user info, show shimmer avatar
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse ml-3"></div>
                    ) : !isLoggedIn ? (
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-3 py-2">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `text-gray-700 hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                                    }`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </NavLink>

                            <button
                                onClick={() => {
                                    navigate("/signup");
                                    setMenuOpen(false);
                                }}
                                className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 hover:cursor-pointer"
                            >
                                Start for Free
                            </button>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/api-generator"
                                className={({ isActive }) =>
                                    `px-3 py-2 hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                                    }`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                Create API Key
                            </NavLink>

                            {/* User Avatar */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    className={`ml-3 w-12 h-12 rounded-full transition-all duration-300 overflow-hidden 
                    ${dropdownOpen
                                            ? "ring-2 ring-blue-500 scale-105"
                                            : "hover:ring-2 hover:ring-blue-400"
                                        }`}
                                >
                                    <img
                                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
                                            name || "User"
                                        )}`}
                                        alt="user"
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                </button>

                                {dropdownOpen && (
                                            <div
                                                className="absolute right-0 top-20 text-xl font-medium bg-white rounded-xl shadow-xl border
             min-w-[260px] animate-fadeIn p-4"
                                            >
                                                {/* User Section */}
                                                <div className="flex items-center gap-3 pb-3 border-b">
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
                                                            name || "User"
                                                        )}`}
                                                        alt="user"
                                                        className="w-14 h-14 rounded-full object-cover border"
                                                    />

                                                    <div className="flex flex-col">
                                                        <p className="font-semibold text-base leading-5">{name}</p>
                                                        <p className="text-gray-600 text-sm leading-4">{email}</p>
                                                    </div>
                                                </div>

                                                {/* Menu Links */}
                                                <div className="mt-3 space-y-1">
                                                    <NavLink
                                                        to="/docs"
                                                        className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-base"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        Documentation
                                                    </NavLink>

                                                    {role === "admin" ? (
                                                        <NavLink
                                                            to="/admin-page"
                                                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-base"
                                                            onClick={() => setDropdownOpen(false)}
                                                        >
                                                            Admin Panel
                                                        </NavLink>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-base cursor-pointer"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                Become an Admin
                                                            </button>
                                                            <AdminRequest open={open} setOpen={setOpen} />
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500 text-base cursor-pointer"
                                                    >
                                                        {signingOut ? "Signing out…" : "Logout"} 
                                                    </button>
                                                </div>
                                            </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
