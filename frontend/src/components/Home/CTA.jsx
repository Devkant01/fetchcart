// src/components/home/CTA.jsx
import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function CTA() {
    return (
        <section className="py-16">
            <motion.div
                className="rounded-2xl bg-blue-600 text-white p-8 shadow-lg"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to speed up development?</h3>
                        <p className="text-sm mt-1 text-white/90">
                            Generate images and product metadata instantly — get your API key and start integrating.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <NavLink
                            to="/docs#try"
                            className="inline-block capitalize rounded-2xl bg-white text-[#0d7ff2] px-6 py-3 font-medium shadow hover:opacity-95"
                        >
                            try it live
                        </NavLink>

                        <NavLink
                            to="/docs"
                            className="inline-block rounded-2xl border border-white/30 px-6 py-3 text-white/95 hover:bg-white/10"
                        >
                            Read Docs
                        </NavLink>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
