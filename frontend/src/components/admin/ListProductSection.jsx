import React from "react";
import useListProducts from "../../hooks/useListProducts";

import ProductCard from "./ProductCard";
import UpdateModal from "./UpdateModal";
import EmptyState from "./EmptyState";

export default function ListProductSection() {
  const {
    products,
    loading,
    updating,
    deleting,
    editProduct,
    setEditProduct,
    handleDelete,
    handleUpdate,
  } = useListProducts();

  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📦 Your Products
      </h2>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500 animate-pulse">
          Loading products...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && products.length === 0 && <EmptyState />}

      {/* PRODUCT LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            setEditProduct={setEditProduct}
            handleDelete={handleDelete}
            deleting={deleting}
          />
        ))}
      </div>

      {/* UPDATE MODAL */}
      <UpdateModal
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        handleUpdate={handleUpdate}
        updating={updating}
      />
    </div>
  );
}
