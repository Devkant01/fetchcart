import React from "react";
import { categories } from "../../data/categories";

export default function Organization({
    formData,
    handleChange,
    handleCategory,
    selectedCategory,
    subcategories,
}) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Seller</label>
            <input
                value={formData.seller}
                readOnly
                className="w-full mb-4 p-3 rounded-xl border bg-gray-100 text-gray-500 cursor-not-allowed"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
            <select
                name="category"
                value={selectedCategory}
                onChange={handleCategory}
                required
                className="w-full mb-4 p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Category</option>
                {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-700">Subcategory</label>
            <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Subcategory</option>
                {subcategories.map((sc) => (
                    <option key={sc} value={sc}>
                        {sc}
                    </option>
                ))}
            </select>
        </div>
    );
}
