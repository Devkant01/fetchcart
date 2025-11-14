// src/components/home/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Network, FileJson } from "lucide-react";

const steps = [
    {
        icon: <UserPlus size={22} className="text-blue-400" />,
        title: "Sign Up",
        desc: "Create an account in seconds and get your unique API key.",
    },
    {
        icon: <Network size={22} className="text-blue-400" />,
        title: "Make an API Call",
        desc: "Use a simple fetch request to our endpoints to get the data you need.",
    },
    {
        icon: <FileJson size={22} className="text-blue-400" />,
        title: "Get Mock Data",
        desc: "Receive a JSON response with high-quality mock data for your project.",
    },
];

export default function HowItWorks() {
    return (
        <section className="pt-12">
            <h2 className="text-2xl md:text-3xl font-extrabold scale-y-110 mb-4">How it works</h2>

            <div className="flex flex-col space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 relative">

                        {/* Icon */}
                        <div className="mt-1">{step.icon}</div>

                        {/* Vertical connecting line */}
                        {index !== steps.length - 1 && (
                            <div className="absolute left-[9px] top-8 h-10 border-l border-gray-700"></div>
                        )}

                        {/* Text */}
                        <div>
                            <h3 className="font-semibold text-lg mb-1">
                                {index + 1}. {step.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
