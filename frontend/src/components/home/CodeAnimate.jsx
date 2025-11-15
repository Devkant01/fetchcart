import React, { useEffect, useState, useRef } from "react";

export default function FetchCartTypingAnimation() {
    const request = "GET https://fetchcart-backend.vercel.app/api/v1/prod/<api-key>/get-all-products?limit=1";

    const responseLines = [
        "{",
        "  \"data\": {",
        "    \"status\": \"success\",",
        "    \"products\": [",
        "      {",
        "        \"id\": 1,",
        "        \"title\": \"Brass Krishna Idol\",",
        "        \"description\": \"Handcrafted brass idol of Lord Krishna with intricate detailing.\",",
        "        \"price\": 799,",
        "        \"images\": [",
        "          { ... }",
        "        ],",
        "        \"category\": \"home decor spiritual\",",
        "        \"subcategory\": \"god idols\",",
        "        \"quantity\": 120,",
        "        \"seller\": \"devkant kumar\",",
        "        \"status\": \"published\"",
        "      }",
        "    ],",
        "    \"has_more\": true",
        "  }",
        "}"
    ];

    const [typedRequest, setTypedRequest] = useState("");
    const [typingRequestDone, setTypingRequestDone] = useState(false);
    const [visibleResponseLines, setVisibleResponseLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [cursorOn, setCursorOn] = useState(true);
    const [isResponseTyping, setIsResponseTyping] = useState(false);

    const requestRef = useRef(request);
    const responseRef = useRef(responseLines);

    useEffect(() => {
        const id = setInterval(() => setCursorOn(v => !v), 500);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        let i = 0;
        const speed = 18;

        function typeNext() {
            if (i <= requestRef.current.length) {
                setTypedRequest(requestRef.current.slice(0, i));
                i++;
                setTimeout(typeNext, speed);
            } else {
                setTypingRequestDone(true);
            }
        }
        typeNext();
    }, []);

    useEffect(() => {
        if (!typingRequestDone) return;
        const pause = setTimeout(() => setIsResponseTyping(true), 600);
        return () => clearTimeout(pause);
    }, [typingRequestDone]);

    useEffect(() => {
        if (!isResponseTyping) return;
        if (currentLine >= responseRef.current.length) return;

        let charIdx = 0;
        const line = responseRef.current[currentLine];
        const perChar = 8 + Math.random() * 20;

        function typeChar() {
            charIdx++;
            setVisibleResponseLines(prev => {
                const copy = [...prev];
                copy[currentLine] = line.slice(0, charIdx);
                return copy;
            });

            if (charIdx <= line.length) {
                setTimeout(typeChar, perChar);
            } else {
                setTimeout(() => setCurrentLine(n => n + 1), 120 + Math.random() * 400);
            }
        }

        setVisibleResponseLines(prev => {
            const next = [...prev];
            while (next.length <= currentLine) next.push("");
            return next;
        });

        const starter = setTimeout(typeChar, 120 + Math.random() * 160);
        return () => clearTimeout(starter);
    }, [isResponseTyping, currentLine]);

    useEffect(() => {
        if (currentLine >= responseRef.current.length) setIsResponseTyping(false);
    }, [currentLine]);

    return (
        <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl p-6">
            <div className="text-sm text-green-400 font-mono overflow-x-auto whitespace-nowrap pb-4 border-b border-white/10">
                {typedRequest}
                <span className={`${cursorOn ? "opacity-100" : "opacity-0"} inline-block w-1 ml-1 h-5 bg-green-400`} />
            </div>

            <div className="mt-4 text-sm font-mono text-slate-200">
                <div className="mb-2 text-slate-400">Response:</div>

                <div className="bg-black/40 rounded-md p-4 text-xs h-64 overflow-y-auto">
                    {visibleResponseLines.map((line, idx) => (
                        <pre key={idx} className="whitespace-pre leading-5">
                            {line}
                            {idx === visibleResponseLines.length - 1 && cursorOn && (
                                <span className={`${isResponseTyping ? "inline-block" : "hidden"} w-1 h-5 bg-slate-300 ml-1`} />
                            )}
                        </pre>
                    ))}

                    {isResponseTyping && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                            <div className="h-2 w-2 rounded-full animate-pulse bg-slate-400/60" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}