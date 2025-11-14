import React from "react";
import { Button } from "../common/Button";

export default function ProductCard({
    product,
    setEditProduct,
    handleDelete,
    deleting,
}) {
    const isDeleting = deleting === product._id;

    return (
        <div className="p-5 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {product.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {product.category} → {product.subcategory}
                        </p>

                        <p className="text-sm text-gray-600">
                            ₹{product.price} | Qty: {product.quantity}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button size="sm" onClick={() => setEditProduct(product)}>
                            Update
                        </Button>

                        <Button
                            size="sm"
                            variant="danger"
                            disabled={isDeleting}
                            onClick={() => handleDelete(product._id)}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>

                <div className="w-24 h-24 overflow-hidden rounded-md bg-gray-100">
                    <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
