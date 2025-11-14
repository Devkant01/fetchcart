export default function ProductInfo({ formData, handleChange }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Information
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Title
            </label>
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Modern Wooden Table"
                className="w-full mb-5 p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Description
            </label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write a detailed description..."
                className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
            ></textarea>
        </div>
    );
}
