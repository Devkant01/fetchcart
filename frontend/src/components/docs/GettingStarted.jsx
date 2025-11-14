import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";

export default function GettingStarted() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <motion.section
            id="getting-started"
            className="scroll-mt-28 mb-16"
        >
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2">1️⃣ Authenticate & Generate API Key</h3>
            <p className="text-gray-700 mb-4">
                Login to your FetchCart dashboard → Go to <strong>API Key</strong> section → Click
                <strong> Generate API Key</strong>.
                Authentication is only required at this step.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">2️⃣ Use API Key in Requests</h3>
            <p className="text-gray-700 mb-4">
                For all API requests, simply pass your API key as a <strong>query parameter</strong>.
                No headers. No cookies. Just:
            </p>

            <CodeBlock
                code={`GET ${baseUrl}/prod/<api-key>/get-all-products`}
                lang="bash"
            />

            <h3 className="text-xl font-semibold mt-6 mb-2">Example Request</h3>
            <CodeBlock
                lang="bash"
                code={`curl "${baseUrl}/prod/<api-key>/category/Electronics?limit=5"`}
            />
        </motion.section>
    );
}
