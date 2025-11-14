import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";
import { AlertTriangle, Key, Zap, ListTree } from "lucide-react";

export default function Errors() {
    return (
        <motion.section
            id="errors"
            className="scroll-mt-28 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-bold mb-6">Error Handling</h2>
            <p className="text-gray-700 mb-10">
                FetchCart returns structured, meaningful error messages to help developers quickly identify
                and resolve request issues. Below are the most common grouped error types you may encounter.
            </p>

            <div className="space-y-10">

                {/* 1 — Authentication Errors */}
                <div className="border-l-4 border-red-500 bg-red-50/70 rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Key className="text-red-600" size={22} />
                        <h3 className="text-xl font-semibold text-red-700">Authentication Errors</h3>
                    </div>

                    <p className="text-gray-700 mb-4">
                        Returned when the API key is missing, invalid, revoked, or unauthorized.
                    </p>

                    <CodeBlock
                        lang="json"
                        code={`{
  "status": "error",
  "message": "Invalid API key. Please provide a valid API key."
}`}
                    />
                </div>

                {/* 2 — Rate Limits */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50/70 rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="text-yellow-600" size={22} />
                        <h3 className="text-xl font-semibold text-yellow-700">Rate Limit Errors</h3>
                    </div>

                    <p className="text-gray-700 mb-4">
                        Triggered when too many requests are made in a short period.
                    </p>

                    <CodeBlock
                        lang="json"
                        code={`{
  "status": "error",
  "message": "Too many requests. Please try again later."
}`}
                    />
                </div>

                {/* 3 — Category/Subcategory Errors (Merged) */}
                <div className="border-l-4 border-blue-500 bg-blue-50/70 rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <ListTree className="text-blue-600" size={22} />
                        <h3 className="text-xl font-semibold text-blue-700">
                            Category & Subcategory Errors
                        </h3>
                    </div>

                    <p className="text-gray-700 mb-4">
                        Returned when the provided category or subcategory is misspelled or invalid.
                    </p>

                    <CodeBlock
                        lang="json"
                        code={`{
  "status": "error",
  "message": "No products found under category: Electronicsx.",
  "hint": "Verify spelling or check documentation for valid category names."
}`}
                    />
                </div>

                {/* WRONG ROUTE */}
                <div className="border-l-4 border-orange-500 bg-orange-50/70 rounded-r-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="text-orange-600" size={22} />
                        <h3 className="text-xl font-semibold text-orange-700">Invalid Route</h3>
                    </div>

                    <p className="text-gray-700 mb-4">
                        Returned when the requested endpoint does not exist. This usually happens due to a spelling mistake or an incorrect URL structure.
                    </p>

                    <CodeBlock
                        lang="json"
                        code={`{
  "status": "error",
  "message": "Invalid API endpoint. Read documentation for valid endpoints.",
  "link": "https://yourclienturl/docs
}`}
                    />
                </div>
            </div>
        </motion.section>
    );
}
