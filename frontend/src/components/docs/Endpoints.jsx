// src/components/docs/Endpoints.jsx
import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";

export default function Endpoints() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <motion.section id="endpoints" className="scroll-mt-28 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold mb-4">API Endpoints</h2>

            {/* GET /products */}
            <div className="rounded-xl border p-6 mb-6 bg-white/80">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-700 font-semibold text-sm">GET</span>
                    <code className="font-mono text-sm">/products</code>
                </div>

                <p className="text-gray-700 mb-3">Retrieve a list of products. Use query params to filter.</p>

                <div className="grid gap-3 md:grid-cols-2">
                    <div>
                        <h4 className="font-medium">Query parameters</h4>
                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li><strong>api-key</strong> (required) — your generated API key</li>
                            <li><strong>category</strong> — category slug</li>
                            <li><strong>subcategory</strong> — subcategory slug</li>
                            <li><strong>limit</strong> — number of items</li>
                        </ul>
                    </div>

                    <CodeBlock lang="bash" code={`GET ${baseUrl}/prod/<api-key>/category/<selected-category>?limit=10`} />
                </div>

                <div className="mt-4">
                    <h5 className="font-medium mb-2">Example response (json)</h5>
                    <CodeBlock lang="json" code={`{
  "data": [
    {
      "id": 1,
      "title": "Wireless Headphones",
      "description": "Noise-cancelling over-ear headphones.",
      "price": 129.99,
      "category": "Electronics",
      "subcategory": "Headphones",
      "image": "http://res.cloudinary.com/dowdwnite/images/prod_1a2b3c.jpg",
      "seller": "Acme Store",
      "quantity": 45
    }
  ],
  "has_more": true
}`} />
                </div>
            </div>

            {/* GET /product/get-all-products */}
            <div className="rounded-xl border p-6 mb-6 bg-white/80">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-700 font-semibold text-sm">GET</span>
                    <code className="font-mono text-sm">/get-all-products</code>
                </div>
                <p className="text-gray-700">Retrieves all available products.</p>
                <CodeBlock lang="bash" code={`GET ${baseUrl}/prod/<api-key>/get-all-products`} />
            </div>

            {/* GET /byCategory */}
            <div className="rounded-xl border p-6 mb-6 bg-white/80">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-700 font-semibold text-sm">GET</span>
                    <code className="font-mono text-sm">/category</code>
                </div>
                <p className="text-gray-700 mb-3">
                    Retrieves items from the chosen category.
                </p>
                <CodeBlock
                    lang="bash"
                    code={`GET ${baseUrl}/prod/<api-key>/category/<chosen-category>`}
                />
                <div className="flex items-start gap-2 mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                    <span className="text-yellow-600 font-semibold text-sm">Tip:</span>
                    <p className="text-yellow-700 text-sm">
                        Always spell-check your Category name to avoid empty results.
                    </p>
                </div>
            </div>

            {/* GET /bysubCategory */}
            <div className="rounded-xl border p-6 bg-white/80">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-700 font-semibold text-sm">GET</span>
                    <code className="font-mono text-sm">/subcategory</code>
                </div>
                <p className="text-gray-700">Retrieves products from the chosen subcategory.</p>
                <CodeBlock lang="bash" code={`GET ${baseUrl}/prod/<api-key>/subcategory/<chosen-subcategory>`} />
                <div className="flex items-start gap-2 mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                    <span className="text-yellow-600 font-semibold text-sm">Tip:</span>
                    <p className="text-yellow-700 text-sm">
                        Always spell-check your Sub-Category name to avoid empty results.
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
