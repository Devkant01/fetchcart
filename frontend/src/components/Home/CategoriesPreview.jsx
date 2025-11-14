// src/components/home/CategoriesPreview.jsx
import React from "react";
import { motion } from "framer-motion";

const sample = [
    { name: "Electronics", examples: ["Smartphones", "Laptops", "Headphones"] },
    { name: "Fashion", examples: ["Men's Clothing", "Women's Clothing", "Shoes"] },
    { name: "Home & Kitchen", examples: ["Furniture", "Lighting", "Kitchen"] },
    { name: "Beauty", examples: ["Skincare", "Makeup", "Haircare"] },
];

export default function CategoriesPreview() {
    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <p className="text-gray-600">Pick a category in the docs or try them in the Try-It panel.</p>
                </div>

                <a
                    href="/docs#categories"
                    className="text-sm text-[#0d7ff2] hover:underline"
                >
                    View all categories →
                </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sample.map((c, idx) => (
                    <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="border rounded-xl p-5 bg-white shadow-sm"
                    >
                        <h4 className="font-semibold mb-2">{c.name}</h4>
                        <div className="text-sm text-gray-600">
                            {c.examples.map((s) => (
                                <span key={s} className="inline-block mr-2 mb-2 px-2 py-1 bg-gray-50 rounded">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
