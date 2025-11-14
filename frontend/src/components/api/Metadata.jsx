export default function Metadata({ metadata }) {
    if (!metadata.createdAt) return null;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Metadata</h3>

            <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                    <p className="text-gray-500">CREATED AT</p>
                    <p className="text-gray-800 font-medium mt-1">
                        {new Date(metadata.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500">LAST USED</p>
                    <p className="text-gray-800 font-medium mt-1">
                        {metadata.lastUsed
                            ? new Date(metadata.lastUsed).toLocaleString("en-IN", { hour12: true })
                            : "Never"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500">STATUS</p>
                    <p className="font-medium mt-1">
                        <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${metadata.status === "Active" ? "bg-green-500" : "bg-red-500"
                                }`}
                        ></span>
                        {metadata.status}
                    </p>
                </div>
            </div>
        </div>
    );
}
