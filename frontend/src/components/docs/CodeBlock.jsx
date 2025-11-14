import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import { Copy } from "lucide-react";
import { toastSuccess } from "../../utils/toast";

export default function CodeBlock({ code = "", lang = "json" }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) hljs.highlightElement(ref.current);
    }, [code, lang]);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        toastSuccess("Copied to clipboard!");
    };

    return (
        <div className="relative">
            <button
                onClick={copyCode}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-md shadow cursor-pointer"
            >
                <Copy size={16} />
            </button>

            <pre className="rounded-md overflow-auto bg-gray-50 p-3">
                <code ref={ref} className={`language-${lang} font-mono text-sm`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}
