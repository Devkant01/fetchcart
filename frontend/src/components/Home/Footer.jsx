// src/components/home/Footer.jsx
import React from "react"; 
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="py-8 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <strong>FetchCart</strong> — mock e-commerce media & data for developers.
                </div>

                <div className="flex gap-4 items-center">
                    {/* <NavLink to="/contact" className="hover:underline">Contack</NavLink> */}
                    {/* <NavLink to="/terms" className="hover:underline">Terms</NavLink> */}
                    {/* <NavLink to="/privacy" className="hover:underline">Privacy</NavLink> */}
                    <span>© {new Date().getFullYear()} FetchCart</span>
                </div>
            </div>
        </footer>
    );
}
