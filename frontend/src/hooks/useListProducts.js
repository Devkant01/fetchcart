import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toastSuccess, toastError, toastInfo } from "../utils/toast";

export default function useListProducts() {
    const { name: seller } = useSelector((state) => state.user);

    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const [loading, setLoading] = useState(false);        // When fetching all
    const [updating, setUpdating] = useState(false);      // When updating
    const [deleting, setDeleting] = useState(null);       // Track deleting product ID

    /* =====================================
        FETCH USER PRODUCTS
    ===================================== */
    async function fetchProducts() {
        try {
            setLoading(true);

            const res = await axios.get("/prod/get-list", {
                params: { seller },
                withCredentials: true,
            });

            const list = Array.isArray(res.data?.products) ? res.data.products : [];

            if (list.length === 0) {
                toastInfo("No products found for this seller");
            }

            setProducts(list);
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    /* =====================================
        DELETE PRODUCT
    ===================================== */
    async function handleDelete(id) {
        try {
            setDeleting(id);

            await axios.delete(`/prod/delete-product/${id}`, {
                withCredentials: true,
            });

            setProducts((prev) => prev.filter((p) => p._id !== id));
            toastSuccess("Product deleted successfully");
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to delete product");
        } finally {
            setDeleting(null);
        }
    }

    async function handleUpdate() {
        if (!editProduct) return;

        try {
            setUpdating(true);

            const { _id, ...body } = editProduct;

            const res = await axios.put(`/prod/edit-product/${_id}`, body, {
                withCredentials: true,
            });

            toastSuccess(res.data.message || "Product updated successfully");

            setEditProduct(null);
            fetchProducts();
        } catch (err) {
            toastError(err.response?.data?.message || "Failed to update product");
        } finally {
            setUpdating(false);
        }
    }

    return {
        products,
        loading,
        updating,
        deleting,
        editProduct,
        setEditProduct,
        handleDelete,
        handleUpdate,
    };
}
