import { useState } from "react";
import axios from "axios";
import { toastSuccess, toastError } from "../utils/toast";
import { useSelector } from "react-redux";
import { categories } from "../data/categories";

export default function useAddProduct() {
    const { name: seller } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);  // Multiple files
    const [imagePreview, setImagePreview] = useState([]); // Multiple previews
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        seller: seller || "",
        category: "",
        subcategory: "",
    });

    // Handle simple input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle category change
    const handleCategory = (e) => {
        const cat = e.target.value;

        setSelectedCategory(cat);
        setFormData({ ...formData, category: cat, subcategory: "" });

        const subs = categories.find((c) => c.name === cat)?.subcategories || [];
        setSubcategories(subs);
    };

    // Image upload
    const handleImageUpload = (e) => {
        let files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        if (files.length > 5) {
            toastError("You can upload a maximum of 5 images");
            files = files.slice(0, 5);
        }



        setImageFiles(files);

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    // Submit product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();
            Object.entries(formData).forEach(([key, val]) => data.append(key, val));
            if (imageFiles)
                imageFiles.forEach((file) => {
                data.append("images", file); // KEY MUST MATCH Multer: upload.array("images")
            });


            const res = await axios.post("/prod/add-product", data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            toastSuccess(res.data.message);

            // Reset
            setFormData({
                title: "",
                description: "",
                price: "",
                quantity: "",
                seller,
                category: "",
                subcategory: "",
            });

            setImageFiles(null);
            setImagePreview(null);
            setSelectedCategory("");
            setSubcategories([]);

        } catch (err) {
            toastError(err.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleCategory,
        selectedCategory,
        subcategories,
        handleImageUpload,
        imagePreview,
        loading,
        handleSubmit,
    };
}
