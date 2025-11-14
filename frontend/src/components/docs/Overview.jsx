import React from "react";
import { motion } from "framer-motion";

export default function Overview() {
    return (
        <motion.section
            id="overview"
            className="scroll-mt-28 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
                FetchCart is a developer-focused API that provides high-quality product
                images and structured e-commerce data such as titles, descriptions,
                prices, and seller info — useful for building e-commerce UIs, prototyping,
                student projects, portfolio demos, hackathons, and more.
                <br /><br />
                Instead of manually populating fake product data, FetchCart gives you
                instant access to categorized images and metadata with a simple API call.
            </p>
        </motion.section>
    );
}
