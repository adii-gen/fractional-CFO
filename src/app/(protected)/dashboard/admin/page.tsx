
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/dashboard/sidebar";

const Page = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`transition-all duration-300 flex-1 ${
          collapsed ? "ml-20" : "ml-64"
        } p-6`}
      >
        <h1 className="text-2xl font-semibold">Dashboard Content</h1>
        <p className="mt-4 text-gray-600">
          This is where your main content will appear.
        </p>
      </main>
    </div>
  );
};

export default Page;
