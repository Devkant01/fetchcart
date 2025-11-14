// src/components/docs/Categories.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";

export default function Categories() {
    const [expanded, setExpanded] = useState(false);

    // show only first 3 categories initially
    const visibleList = expanded ? categories : categories.slice(0, 3);

    return (
        <motion.section
            id="categories"
            className="scroll-mt-28 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-bold mb-4">Categories & Subcategories</h2>
            <p className="text-gray-700 mb-6">
                FetchCart supports multiple e-commerce categories. Only a few are shown below —
                expand to see all available options.
            </p>
            <div className="flex items-start gap-2 my-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                <span className="text-yellow-600 font-semibold text-sm">Tip:</span>
                <p className="text-yellow-700 text-sm">
                    For multi-word categories, replace spaces with hyphens or underscores.
                    Example: <code>Mobiles-Accessories</code>, <code>mens-clothing</code>.
                </p>
            </div>

            {/* Category List */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {visibleList.map((c) => (
                        <motion.div
                            key={c.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="rounded-lg border p-4 bg-white/80"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{c.name}</h3>
                                <span className="text-sm text-gray-500">{c.subcategories.length} sub</span>
                            </div>

                            <div className="mt-3 grid gap-2 grid-cols-2">
                                {c.subcategories.map((s) => (
                                    <span
                                        key={s}
                                        className="text-sm text-gray-600 px-2 py-1 rounded-md bg-gray-50"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Show More / Show Less Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    {expanded ? "Show Less" : "Show All Categories"}
                </button>
            </div>
        </motion.section>
    );
}
