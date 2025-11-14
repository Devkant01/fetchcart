import React from 'react';
import { NavLink } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="w-full border-t border-gray-300 py-8 mt-10 bg-white/50 backdrop-blur-md">
            <div className="w-[85%] max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600">
                <p className="text-sm">© {new Date().getFullYear()} FetchCart. All rights reserved.</p>
                <div className="flex gap-4 text-sm mt-2 sm:mt-0">
                    <NavLink to="/docs" className="hover:text-blue-600 transition">Docs</NavLink>
                    <NavLink to="/" className="hover:text-blue-600 transition">GitHub</NavLink>
                    <NavLink to="/" className="hover:text-blue-600 transition">Privacy</NavLink>
                </div>
            </div>
        </footer>
    );
}
