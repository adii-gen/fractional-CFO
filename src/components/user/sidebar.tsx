// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   Home, 
//   BarChart3, 
//   FileText, 
//   Calendar, 
//   Settings, 
//   HelpCircle,
//   LogOut
// } from "lucide-react";

// const Sidebar = () => {
//   const pathname = usePathname();

//   const menuItems = [
//     { icon: Home, label: "Dashboard", href: "/dashboard/user" },
//     { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
//     { icon: FileText, label: "Reports", href: "/dashboard/reports" },
//     { icon: Calendar, label: "Consultations", href: "/dashboard/consultations" },
//     { icon: Settings, label: "Settings", href: "/dashboard/settings" },
//     { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
//   ];

//   return (
//     <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0">
//       <div className="flex flex-col h-full">
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-1">
//             <span className="tracking-widest text-lg font-medium text-gray-700">
//               FRACTIONAL
//             </span>
//             <div className="bg-[#CFE4D1] rounded-md px-2 py-1 flex items-center justify-center">
//               <span className="text-gray-700 text-lg font-semibold">
//                 CXO
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 px-4 py-6">
//           <ul className="space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
              
//               return (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                       isActive
//                         ? "bg-primary text-green-700 border-r-2 border-green-700"
//                         : "text-gray-600 hover:bg-primary/40 hover:text-gray-900"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5 mr-3" />
//                     {item.label}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout Button */}
//         <div className="p-4 border-t border-gray-200">
//           <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors">
//             <LogOut className="w-5 h-5 mr-3" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BarChart3,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/user" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports" },
    { icon: Calendar, label: "Consultations", href: "/dashboard/user/consultations" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
  ];

  const LogOutFunc=async ()=>{
    await signOut();
    router.push("/")
  }
  return (
    <div
      className={`h-screen bg-white shadow-lg border-r border-gray-200 fixed left-0 top-0 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-1">
            <span className="tracking-widest text-lg font-medium text-gray-700">
              FRACTIONAL
            </span>
            <div className="bg-[#CFE4D1] rounded-md px-2 py-1 flex items-center justify-center">
              <span className="text-gray-700 text-lg font-semibold">CXO</span>
            </div>
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-3 transition-colors ${
                    isActive
                      ? "bg-primary text-green-700 border-r-2 border-green-700"
                      : "text-gray-600 hover:bg-primary/40 hover:text-gray-900"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
        onClick={LogOutFunc}
          className={`flex items-center w-full text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors ${
            collapsed ? "justify-center py-3" : "px-4 py-3"
          }`}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
