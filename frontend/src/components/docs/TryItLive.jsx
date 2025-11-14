import React from "react";
import { motion } from "framer-motion";
import useTryItLive from "../../hooks/useTryItLive";
import { categories } from "../../data/categories";
import CodeBlock from "./CodeBlock";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";

export default function TryItLive() {
    const {
        apiKey,
        setApiKey,
        category,
        setCategory,
        subcategory,
        setSubcategory,
        limit,
        setLimit,
        format,
        setFormat,
        subcategories,
        response,
        loading,
        url,
        setUrl, 
        tryRequest,
    } = useTryItLive();

    // const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchUserApiKey = async () => {
        try {
            const res = await axios.get(`/api/get-api-key`, {
                withCredentials: true,
            });

            if (res?.data?.key) {
                setApiKey(res.data.key);
                toastSuccess("API key loaded!");
            } else {
                toastError(res.data?.message || "No API key found");
            }

        } catch (err) {
            toastError(err.response?.data?.message || "Please login to use this feature");
        }
    };

    const handleTry = async () => {
        if (!apiKey.trim()) return toastError("API key is required");
        if (limit <= 0) return toastError("Limit must be at least 1");

        await tryRequest();
        toastSuccess("Request executed!");
    };

    return (
        <motion.section
            id="try"
            className="scroll-mt-[120px] pt-5 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
        >

            <h2 className="text-3xl font-bold mb-4">Try It Live</h2>

            <div className="rounded-xl border p-6 bg-white/80 grid gap-6 md:grid-cols-2">
                {/* Form Inputs */}
                <div className="space-y-4">

                    <div className="relative">
                        <label className="text-sm font-medium block mb-1">API Key</label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your API key"
                                className="w-full p-3 rounded-md border bg-gray-50"
                            />

                            <button
                                onClick={fetchUserApiKey}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                            >
                                Use My Key
                            </button>
                        </div>
                    </div>


                    <div>
                        <label className="text-sm font-medium block mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 rounded-md border bg-gray-50 cursor-pointer"
                        >
                            <option value="">-- choose category --</option>
                            {categories.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Subcategory</label>
                        <select
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            disabled={!category}
                            className="w-full p-3 rounded-md border bg-gray-50 disabled:opacity-50 disabled:cursor-no-drop cursor-pointer"
                        >
                            <option value="">-- choose subcategory --</option>
                            {subcategories.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-sm font-medium block mb-1">Limit</label>
                            <input
                                type="number"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="w-full p-3 rounded-md border bg-gray-50"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="text-sm font-medium block mb-1">Format</label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}
                                className="w-full p-3 rounded-md border bg-gray-50 cursor-pointer"
                            >
                                <option value="json" className="cursor-pointer">JSON</option>
                                <option value="img" disabled={true} className="cursor-no-drop">Images</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleTry}
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 text-white p-3 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Loading…" : "Try It"}
                    </button>
                </div>

                {/* Response Display */}
                <div className="space-y-3">
                    {/* Generated Request URL */}
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Request URL</p>

                        <CodeBlock code={url || "Enter details to generate the URL."} />

                    </div>

                    <p className="text-sm font-medium">Response</p>

                    {format === "img" && Array.isArray(response) ? (
                        <div className="grid grid-cols-2 gap-2 max-h-72 overflow-auto">
                            {response.map((item, idx) => (
                                <img
                                    key={idx}
                                    src={item.image || item}
                                    alt={item.title || `img-${idx}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="max-h-58 overflow-auto rounded-md border p-2 bg-gray-50">
                            <CodeBlock
                                lang="json"
                                code={
                                    response
                                        ? JSON.stringify(response, null, 2)
                                        : '{ "message": "No response yet" }'
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
}
