import React from "react";
import { motion } from "framer-motion";

const sections = [
    { id: "overview", label: "Overview" },
    { id: "getting-started", label: "Getting Started" },
    { id: "categories", label: "Categories" },
    { id: "endpoints", label: "API Endpoints" },
    { id: "errors", label: "Error Handling" },
    { id: "try", label: "Try It Live" },
];

export default function Sidebar({ mobileOpen, setMobileOpen, active }) {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 hidden lg:block sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto border-r pr-5">
                <nav className="space-y-2">
                    {sections.map((s) => {
                        const isActive = active === s.id;
                        return (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                // use border-l for active, keep consistent padding so items don't shift
                                className={`block py-2 rounded-r-md transition-all ${isActive
                                        ? "border-l-4 border-blue-600 pl-4 text-blue-600 bg-blue-50/40"
                                        : "pl-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                            >
                                {s.label}
                            </a>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl"
                onClick={() => setMobileOpen(true)}
                aria-label="Open docs menu"
            >
                Menu
            </button>

            {/* MOBILE DRAWER */}
            {mobileOpen && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    className="lg:hidden fixed inset-0 bg-black/40 flex"
                >
                    <div className="w-64 bg-white h-full shadow-xl p-5">
                        <h2 className="text-xl font-bold mb-4">Docs Menu</h2>

                        <nav className="space-y-3">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-gray-800 hover:text-blue-600 font-medium"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </nav>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="mt-6 text-gray-600 underline"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
}
