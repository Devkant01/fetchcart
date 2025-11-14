// src/components/home/Features.jsx
import React from "react";
import { CheckCircle, Plug, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const items = [
    {
        "title": "Easy Integration",
        "icon": "Plug",
        "body": "Drop-in friendly API endpoints with zero setup—works seamlessly with any frontend, backend, or mobile framework."
    },
    {
        "title": "Secure & Persistent State",
        "icon": "ShieldCheck",
        "body": "Your account stays protected with secure authentication, while persistent sessions keep you logged in without interruptions."
    },
    {
        "title": "Blazing Fast",
        "icon": "Zap",
        "body": "Fetch optimized, low-latency data in milliseconds—perfect for rapid development, demos, and real-time UI updates."
    },
    {
        "title": "Stable JSON Responses",
        "icon": "CheckCircle",
        "body": "Clean, predictable, and consistent response formats that make parsing, testing, and UI rendering effortless."
    },
];

export default function Features() {
    const iconMap = { Plug, ShieldCheck, Zap, CheckCircle };

    return (
        <section className="py-10">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold scale-y-110">Why FetchCart?</h2>
                <p className="text-gray-600 my-4">
                    Built for developers who want fast, reliable sample product data without fuss.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((it, i) => {
                    const Icon = iconMap[it.icon];
                    return (
                        <motion.div
                            key={it.title}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-xl p-6 bg-white/90 backdrop-blur-xl shadow-xl hover:scale-120 hover:transition-all"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-md bg-[#e7f0ff]">
                                    {Icon ? <Icon className="text-[#0d7ff2]" size={18} /> : null}
                                </div>
                                <h3 className="font-semibold">{it.title}</h3>
                            </div>

                            <p className="text-sm text-gray-600">{it.body}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
