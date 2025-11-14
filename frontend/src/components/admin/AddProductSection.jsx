import React from "react";
import useAddProduct from "../../hooks/useAddProduct";

import ProductInfo from "./ProductInfo";
import ProductImages from "./ProductImages";
import PricingInventory from "./PricingInventory";
import Organization from "./Organization";
import ActionButtons from "./ActionButtons";

export default function AddProductSection() {
    const {
        formData,
        handleChange,
        handleCategory,
        selectedCategory,
        subcategories,
        handleImageUpload,
        imagePreview,
        loading,
        handleSubmit
    } = useAddProduct();

    return (
        <div className="w-full min-h-screen px-4 md:px-10 py-10 bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

            <form
                onSubmit={handleSubmit}
                className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <ProductInfo formData={formData} handleChange={handleChange} />
                    <ProductImages
                        handleImageUpload={handleImageUpload}
                        imagePreview={imagePreview}
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    <PricingInventory formData={formData} handleChange={handleChange} />

                    <Organization
                        formData={formData}
                        handleChange={handleChange}
                        handleCategory={handleCategory}
                        selectedCategory={selectedCategory}
                        subcategories={subcategories}
                    />

                </div>
                <div className="lg:col-span-3">
                    <ActionButtons loading={loading} />
                </div>
            </form>
        </div>
    );
}
