import { useState } from "react";
import axios from "axios";
import { categories } from "../data/categories";

export default function useTryItLive() {
    const [apiKey, setApiKey] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [limit, setLimit] = useState(10);
    const [format, setFormat] = useState("json");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    
    const subcategories =
        categories.find((c) => c.name === category)?.subcategories || [];

    async function tryRequest() {
        if (!apiKey.trim()) return alert("API key is required");

        try {
            setLoading(true);
            setResponse(null);
            let finalUrl = "";
            if ((!category || category === "") && (!subcategory || subcategory === "")) {
                finalUrl = `${baseUrl}/prod/${apiKey}/get-all-products?limit=${limit || 10}`;
            } else if (subcategory === "") {
                finalUrl = `${baseUrl}/prod/${apiKey}/category/${category}?limit=${limit || 10}`;
            } else {
                finalUrl = `${baseUrl}/prod/${apiKey}/subcategory/${subcategory}?limit=${limit || 10}`;
            }

            setUrl(finalUrl);
            const res = await axios.get(finalUrl);
            setResponse(
                typeof res.data === "object"
                    ? res.data
                    : { message: res.data }
            );
        } catch (err) {
            setResponse({
                error: err.response?.data || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    }

    return {
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
        tryRequest,
        url,
        setUrl
    };
}
