// import Link from 'next/link'
// import React, { useState } from 'react'
// import { Button } from '../ui/button'
// import { Menu, X } from 'lucide-react';

// const UserNavbar = () => {
//       const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div> <nav className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Logo */}
//             <div className="py-4">
//               <Link href="/">
//                 <div className="flex items-center space-x-1 cursor-pointer">
//                   <span className="tracking-widest text-lg md:text-lg font-medium text-gray-700">
//                     FRACTIONAL
//                   </span>
//                   <div className="bg-[#CFE4D1] rounded-md px-2 py-1 flex items-center justify-center">
//                     <span className="text-gray-700 text-lg md:text-lg font-semibold">CXO</span>
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center space-x-6">
//               <a href="#expertise" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
//                 Our Expertise
//               </a>
//               <a href="#pricing" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
//                 Pricing
//               </a>
//               <a href="#demo" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
//                 Demo
//               </a>
//               <a href="#contact" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
//                 Contact
//               </a>
//               <a href="#faqs" className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium">
//                 FAQs
//               </a>
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Link href="/auth/login">
//                 <Button
//                   variant="outline"
//                   className="border-green-700 text-green-700 hover:bg-primary hover:text-white text-sm"
//                 >
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/auth/register">
//                 <Button className="bg-green-800 hover:bg-green-900 text-white text-sm">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 focus:outline-none"
//               >
//                 {isOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="md:hidden bg-white pb-3 px-4 z-50 absolute top-16 left-0 w-full shadow-lg">
//             <div className="flex flex-col space-y-2 pt-2">
//               {/* Links */}
//               {['features', 'pricing', 'demo', 'contact'].map(section => (
//                 <a
//                   key={section}
//                   href={`#${section}`}
//                   className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-base font-medium"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {section.charAt(0).toUpperCase() + section.slice(1)}
//                 </a>
//               ))}

//               {/* Auth Buttons */}
//               <div className="pt-2 border-t border-gray-200">
//                 <Link href="/auth/login">
//                   <Button
//                     variant="outline"
//                     className="w-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white mb-2"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Sign In
//                   </Button>
//                 </Link>

//                 <Link href="/auth/login">
//                   <Button
//                     className="w-full bg-green-700 hover:bg-green-800 text-white"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Start Free Trial
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}

//       </nav></div>
//   )
// }

// export default UserNavbar

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="py-4">
            <Link href="/">
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="tracking-widest text-lg md:text-lg font-medium text-gray-700">
                  FRACTIONAL
                </span>
                <div className="bg-[#CFE4D1] rounded-md px-2 py-1 flex items-center justify-center">
                  <span className="text-gray-700 text-lg md:text-lg font-semibold">
                    CXO
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {["expertise", "pricing", "demo", "contact", "faqs"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-gray-600 hover:text-green-700 text-sm font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="User Avatar"
                      width={35}
                      height={35}
                      className="rounded-full border"
                    />
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-gray-700 text-sm font-medium">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-green-800 hover:bg-green-900 text-white text-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white pb-3 px-4 z-50 absolute top-16 left-0 w-full shadow-lg">
          <div className="flex flex-col space-y-2 pt-2">
            {["expertise", "pricing", "demo", "contact", "faqs"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}

            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={30}
                        height={30}
                        className="rounded-full border"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-700 text-white text-sm font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-gray-700 text-sm">{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white mb-2"
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      className="w-full bg-green-700 hover:bg-green-800 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
