// import Sidebar from "@/components/admin/dashboard/sidebar";
// import { SessionProvider } from "next-auth/react";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SessionProvider>
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1">{children}</main>
//       </div>
//     </SessionProvider>
//   );
// }


// import Sidebar from "@/components/admin/dashboard/sidebar";
// import { SessionProvider } from "next-auth/react";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SessionProvider>
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="w-64 shrink-0">
//           <Sidebar />
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </SessionProvider>
//   );
// }

"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/dashboard/sidebar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main content */}
        <main
          className={`transition-all duration-300 flex-1 ${
            collapsed ? "ml-20" : "ml-64"
          } p-6`}
        >
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
