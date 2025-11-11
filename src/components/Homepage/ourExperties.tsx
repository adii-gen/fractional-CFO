"use client";

import { useEffect, useState } from "react";
import { DollarSign, BarChart3, LineChart, Briefcase, Computer } from "lucide-react";

// types/expertise.ts
export interface Expertise {
  id: string;
  header: string;
  description: string;
  iconImage: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExpertiseApiResponse {
  success: boolean;
  data: Expertise[];
}

// Icon mapping - you can extend this based on your iconImage values
const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-10 w-10 text-emerald-600" />,
  BarChart3: <BarChart3 className="h-10 w-10 text-emerald-600" />,
  LineChart: <LineChart className="h-10 w-10 text-emerald-600" />,
  Briefcase: <Briefcase className="h-10 w-10 text-emerald-600" />,
  Computer: <Computer className="h-10 w-10 text-emerald-600" />,
};

// Helper function to get icon or return null
function getIcon(iconName: string | null): React.ReactNode {
  if (!iconName || iconName.trim() === "") {
    return null;
  }
  return iconMap[iconName] || null;
}

export default function ExpertiseSection() {
  const [expertiseData, setExpertiseData] = useState<Expertise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExpertise() {
      try {
        const response = await fetch("/api/expertise");
        
        if (!response.ok) {
          throw new Error("Failed to fetch expertise data");
        }

        const result = await response.json();
        
        if (result.success) {
          setExpertiseData(result.data);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching expertise:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExpertise();
  }, []);

  if (loading) {
    return (
      <div id="expertise">
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-300 h-64 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div id="expertise">
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-red-600">Error loading expertise: {error}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="expertise">
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">
            Our Expertise
          </h2>
          <p className="text-gray-600 mb-12 max-w-7xl mx-auto">
            Get the financial clarity and control you need to scale your business — all without hiring a full-time CFO.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {expertiseData.map((expertise) => {
              const icon = getIcon(expertise.iconImage);
              
              return (
                <div
                  key={expertise.id}
                  className="bg-primary/40 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  {icon && (
                    <div className="flex justify-center mb-4">
                      {icon}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">
                    {expertise.header}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {expertise.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// Alternative: Server Component Version (SSR)
// app/components/ExpertiseSectionServer.tsx
// import { DollarSign, BarChart3, LineChart, Briefcase, Computer } from "lucide-react";

// const iconMap: Record<string, React.ReactNode> = {
//   DollarSign: <DollarSign className="h-10 w-10 text-emerald-600" />,
//   BarChart3: <BarChart3 className="h-10 w-10 text-emerald-600" />,
//   LineChart: <LineChart className="h-10 w-10 text-emerald-600" />,
//   Briefcase: <Briefcase className="h-10 w-10 text-emerald-600" />,
//   Computer: <Computer className="h-10 w-10 text-emerald-600" />,
// };

// // Helper function to get icon or return null
// function getIcon(iconName: string | null): React.ReactNode {
//   if (!iconName || iconName.trim() === "") {
//     return null;
//   }
//   return iconMap[iconName] || null;
// }

// async function getExpertise() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/expertise`,
//       { cache: "no-store" } // or { next: { revalidate: 3600 } } for ISR
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch expertise");
//     }

//     const result = await response.json();
//     return result.data;
//   } catch (error) {
//     console.error("Error fetching expertise:", error);
//     return [];
//   }
// }

// export default async function ExpertiseSectionServer() {
//   const expertiseData = await getExpertise();

//   return (
//     <div id="expertise">
//       <section className="py-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-semibold mb-4 text-gray-900">
//             Our Expertise
//           </h2>
//           <p className="text-gray-600 mb-12 max-w-7xl mx-auto">
//             Get the financial clarity and control you need to scale your business — all without hiring a full-time CFO.
//           </p>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
//             {expertiseData.map((expertise: any) => {
//               const icon = getIcon(expertise.iconImage);
              
//               return (
//                 <div
//                   key={expertise.id}
//                   className="bg-primary/40 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
//                 >
//                   {icon && (
//                     <div className="flex justify-center mb-4">
//                       {icon}
//                     </div>
//                   )}
//                   <h3 className="text-xl font-semibold mb-2">
//                     {expertise.header}
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     {expertise.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }