// src/components/home/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Hero() {
    return (
        <header className="py-10">
            <div className="grid gap-8 md:grid-cols-2 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-between h-full"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight capitalize scale-y-110 mb-4">
                        The ultimate mock data api for UI, prototyping & testing.
                    </h1>

                    <p className="text-lg text-gray-700 mb-6">
                        Power your workflow with instant, reliable mock data and images—perfect for Hackathons, demos, tutorials and early-stage development.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <NavLink
                            to="/signup"
                            className="inline-block rounded-xl text-lg md:text-xl bg-blue-600 text-white px-6 py-3 font-medium shadow hover:bg-[#0b6fe0] transition"
                        >
                            Get Started
                        </NavLink>

                        <NavLink
                            to="/docs"
                            className="inline-block rounded-xl text-lg md:text-xl border border-gray-200 px-6 py-3 text-gray-800 hover:bg-gray-50 transition"
                        >
                            View Docs
                        </NavLink>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white rounded-2xl shadow-md border"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="rounded-md overflow-hidden bg-[#0f1724] text-white font-mono text-sm">
                        <pre className="p-4">
                            {`GET https://api.fetchcart.com/v1/products?apiKey=YOUR_KEY&category=electronics&limit=3

Response:
{
  "data": [
    {
      "id": "prod_1a2b3c",
      "title": "Noise-Cancelling Headphones",
      "price": 129.99,
      "category": "electronics",
      "subcategory": "headphones",
      "image": "https://cdn.fetchcart.com/images/prod_1a2b3c.jpg",
      "seller": "Acme Store"
    },
    ...
  ]
}`}
                        </pre>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
