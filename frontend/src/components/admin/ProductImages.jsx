export default function ProductImages({ handleImageUpload, imagePreview }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>

            <label className="border-2 border-dashed rounded-xl w-full p-8 flex flex-col items-center justify-center cursor-pointer text-center bg-gray-50 hover:bg-gray-100 transition">
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                <div className="text-gray-500">
                    <span className="text-lg">📁</span>
                    <p className="font-medium">Click to upload</p>
                    <p className="text-xs">SVG, PNG, JPG (max 800×400)</p>
                </div>
            </label>

            {imagePreview && (
                <div className="mt-4 flex gap-4 overflow-x-auto">
                    {imagePreview.map((src, i) => (
                        <img key={i} src={src} className="w-24 h-24 object-cover border rounded-2xl" />
                    ))}
                </div>
            )}
        </div>
    );
}
 