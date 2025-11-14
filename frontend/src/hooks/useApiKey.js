import { useEffect, useState } from "react";
import axios from "axios";
import { toastSuccess, toastError, toastInfo } from "../utils/toast";

export default function useApiKey() {
    const [apiKey, setApiKey] = useState(null);
    const [hidden, setHidden] = useState(true);
    const [metadata, setMetadata] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch existing API key
    async function fetchKey() {
        try {
            const res = await axios.get("/api/get-api-key", {
                withCredentials: true,
            });
            const { key, createdAt, lastUsed, status } = res.data;

            setApiKey(key);
            setMetadata({ createdAt, lastUsed, status });
        } catch {
            setApiKey(null);
        }
    }

    useEffect(() => {
        fetchKey();
    }, []);

    // Generate Key
    async function generateKey() {
        try {
            setLoading(true);
            const res = await axios.post("/api/generate-new-api-key", {}, { withCredentials: true });
            toastSuccess(res.data.message);
            setApiKey(res.data.key);
            fetchKey();
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to generate key");
        } finally {
            setLoading(false);
        }
    }

    // Regenerate Key
    async function regenerateKey() {
        try {
            setLoading(true);
            const res = await axios.post("/api/regenerate-api-key", {}, { withCredentials: true });
            toastSuccess(res.data.message);

            setApiKey(res.data.key);
            fetchKey();
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to regenerate key");
        } finally {
            setLoading(false);
        }
    }

    // Revoke Key
    async function revokeKey() {
        try {
            setLoading(true);
            const res = await axios.delete("/api/delete-api-key", { withCredentials: true });
            toastSuccess(res.data.message);

            setApiKey(null);
            setMetadata({});
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to revoke key");
        } finally {
            setLoading(false);
        }
    }

    // Copy key
    function handleCopy() {
        if (!apiKey) return toastInfo("No API key to copy");
        navigator.clipboard.writeText(apiKey);
        toastSuccess("API key copied!");
    }

    // Hide/unhide
    function handleToggleHidden() {
        setHidden(!hidden);
    }

    return {
        apiKey,
        hidden,
        loading,
        metadata,
        handleCopy,
        handleToggleHidden,
        generateKey,
        regenerateKey,
        revokeKey,
    };
}
