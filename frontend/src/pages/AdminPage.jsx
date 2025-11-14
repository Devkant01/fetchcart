import React, { useState } from "react";

// ⭐ ONLY TWO IMPORTS — clean and modular:
import AddProductSection from "../components/admin/AddProductSection";
import ListProductSection from "../components/admin/ListProductSection";
import { Button } from "../components/common/Button";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* TOP TAB BUTTONS */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "add" ? "solid" : "outline"}
          size="md"
          onClick={() => setActiveTab("add")}
        >
          ➕ Add Product
        </Button>

        <Button
          variant={activeTab === "show" ? "solid" : "outline"}
          size="md"
          onClick={() => setActiveTab("show")}
        >
          📦 Show Products
        </Button>

      </div>

      {/* RENDER SECTIONS */}
      {activeTab === "add" && <AddProductSection />}
      {activeTab === "show" && <ListProductSection />}
    </div>
  );
}
