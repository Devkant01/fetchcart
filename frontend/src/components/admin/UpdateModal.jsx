import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../common/Button";

export default function UpdateModal({
    editProduct,
    setEditProduct,
    handleUpdate,
    updating,
}) {
    if (!editProduct) return null;

    // List of editable fields
    const fields = [
        "title",
        "description",
        "price",
        "category",
        "subcategory",
        "quantity",
    ];

    // Disable editing while updating
    const disabled = updating;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Update Product
                    </h3>

                    {/* INPUT FIELDS */}
                    {fields.map((field) => (
                        <input
                            key={field}
                            type={
                                field === "price" || field === "quantity" ? "number" : "text"
                            }
                            name={field}
                            value={editProduct[field]}
                            disabled={disabled}
                            onChange={(e) =>
                                setEditProduct({ ...editProduct, [field]: e.target.value })
                            }
                            className={`w-full mb-3 p-3 border rounded-lg bg-gray-50 
              focus:ring-2 focus:ring-blue-500 outline-none 
              ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
                            placeholder={`Edit ${field}`}
                        />
                    ))}

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditProduct(null)}
                        >
                            Cancel
                        </Button>

                        <Button size="sm" onClick={handleUpdate} disabled={disabled}>
                            {disabled ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
