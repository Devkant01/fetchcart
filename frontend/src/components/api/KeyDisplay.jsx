import { Button } from "../common/Button";
import { Eye, EyeOff, Copy, RefreshCcw } from "lucide-react";

export default function KeyDisplay({
    apiKey,
    hidden,
    loading,
    handleCopy,
    handleToggleHidden,
    generateKey,
    regenerateKey,
}) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your API Key</h2>

            {/* Key Box */}
            <div className="flex items-center gap-3 bg-gray-50 border rounded-xl px-4 py-3">
                <span className="flex-1 font-mono text-lg tracking-wide select-none">
                    {apiKey ? (hidden ? "••••••••••••••••••••••••••" : apiKey) : "No API key generated"}
                </span>

                <button
                    className="text-gray-600 hover:text-gray-800 transition"
                    onClick={handleToggleHidden}
                >
                    {hidden ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
            </div>

            <p className="text-gray-500 text-sm mt-1">
                This is your API key. Store it securely.
            </p>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    size="md"
                    className="flex items-center justify-center gap-2"
                    onClick={handleCopy}
                >
                    <Copy size={18} /> Copy Key
                </Button>

                {apiKey ? (
                    <Button
                        size="md"
                        className="flex items-center justify-center gap-2"
                        onClick={regenerateKey}
                    >
                        <RefreshCcw size={18} /> Regenerate Key
                    </Button>
                ) : (
                    <Button size="md" onClick={generateKey}>
                        Generate API Key
                    </Button>
                )}
            </div>
        </div>
    );
}
