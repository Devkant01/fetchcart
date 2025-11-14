import React, { useState, useEffect } from "react";
import Sidebar from "../components/docs/Sidebar";
import Overview from "../components/docs/Overview";
import GettingStarted from "../components/docs/GettingStarted";
import Categories from "../components/docs/Categories";
import Endpoints from "../components/docs/Endpoints";
import Errors from "../components/docs/Errors";
import TryItLive from "../components/docs/TryItLive";
import useActiveSection from "../hooks/useActiveSection";
import { useLocation } from "react-router-dom";

export default function Documentation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  const active = useActiveSection([
    "overview",
    "getting-started",
    "categories",
    "endpoints",
    "errors",
    "try",
  ], { offset: 112 });

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto w-full max-w-[1200px] px-4 lg:px-8 py-10 flex gap-8">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} active={active} />

        <main className="flex-1">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold">FetchCart API</h1>
            <p className="text-gray-600 mt-2">Standard-quality product data for developers.</p>
          </header>

          <Overview />
          <GettingStarted />
          <Categories />
          <Endpoints />
          <Errors />
          <TryItLive />
        </main>
      </div>
    </div>
  );
}
