export default function PricingInventory({ formData, handleChange }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing & Inventory
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
            <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="₹ 499"
                className="w-full mb-4 p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
                Stock Quantity
            </label>
            <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="150"
                className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
}
