// 'use client';

// import React from 'react';
// import { Star, Quote } from 'lucide-react';

// export default function Testimonials() {
//   const testimonials = [
//     // {
//     //   name: "Riya Sharma",
//     //   role: "Founder & CEO",
//     //   company: "TechStart India",
//     //   image: "RS",
//     //   feedback: "We went from chaos to clarity in under two months. Their team streamlined everything — from budgeting to investor decks. The ROI has been incredible.",
//     //   rating: 5,
//     //   color: "from-pink-500 to-rose-500"
//     // },
//     // {
//     //   name: "Arjun Patel",
//     //   role: "Co-founder",
//     //   company: "GrowthLabs",
//     //   image: "AP",
//     //   feedback: "They helped us prepare for funding and gave us a complete understanding of our burn rate and profitability. We secured Series A thanks to their detailed financial models.",
//     //   rating: 5,
//     //   color: "from-blue-500 to-cyan-500"
//     // },
//     // {
//     //   name: "Neha Singh",
//     //   role: "Managing Director",
//     //   company: "Retail Solutions Co",
//     //   image: "NS",
//     //   feedback: "The insights we now get monthly are priceless. They feel like an in-house finance team — just smarter. Our decision-making has improved dramatically.",
//     //   rating: 5,
//     //   color: "from-emerald-500 to-teal-500"
//     // },
//     {
//       name: "Vikram Malhotra",
//       role: "Operations Head",
//       company: "Manufacturing Plus",
//       image: "VM",
//       feedback: "Outstanding service! They transformed our financial operations and helped us identify cost-saving opportunities worth millions. Highly recommend their expertise.",
//       rating: 5,
//       color: "from-purple-500 to-pink-500"
//     },
//     {
//       name: "Priya Kapoor",
//       role: "Director",
//       company: "Digital Ventures",
//       image: "PK",
//       feedback: "Professional, responsive, and incredibly knowledgeable. They've become an integral part of our strategic planning and have helped us scale confidently.",
//       rating: 5,
//       color: "from-orange-500 to-red-500"
//     },
//     {
//       name: "Rahul Verma",
//       role: "CFO",
//       company: "Enterprise Solutions",
//       image: "RV",
//       feedback: "Their fractional CFO service gave us enterprise-level financial expertise without the full-time cost. Game-changer for our mid-sized business.",
//       rating: 5,
//       color: "from-indigo-500 to-blue-500"
//     }
//   ];

//   return (
//     <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4 text-gray-900">
//             Client Success Stories
//           </h2>
//           <p className="text-gray-600 mb-4 max-w-3xl mx-auto text-lg">
//             Hear from founders and business owners who've experienced the transformation
//           </p>
//           <div className="flex items-center justify-center gap-2 text-emerald-600">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="h-5 w-5 fill-emerald-600" />
//               ))}
//             </div>
//             <span className="font-semibold">4.9/5 from 500+ reviews</span>
//           </div>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group"
//             >
//               {/* Quote Icon */}
//               <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
//                 <Quote className="h-16 w-16 text-emerald-600" />
//               </div>

//               {/* Rating */}
//               <div className="flex gap-1 mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" />
//                 ))}
//               </div>

//               {/* Feedback */}
//               <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
//                 "{testimonial.feedback}"
//               </p>

//               {/* Author Info */}
//               <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
//                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
//                   {testimonial.image}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-600">{testimonial.role}</p>
//                   <p className="text-xs text-emerald-600 font-medium">{testimonial.company}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 shadow-md">
//           <div className="text-center">
//             <div className="text-4xl font-bold text-emerald-700 mb-2">500+</div>
//             <p className="text-gray-600">Happy Clients</p>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-emerald-700 mb-2">98%</div>
//             <p className="text-gray-600">Satisfaction Rate</p>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-emerald-700 mb-2">₹50Cr+</div>
//             <p className="text-gray-600">Revenue Managed</p>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-emerald-700 mb-2">10+</div>
//             <p className="text-gray-600">Years Experience</p>
//           </div>
//         </div> */}
//       </div>
//     </section>
//   );
// }

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  testimonial: string;
  clientName: string;
  clientInitials: string;
  designation: string;
  companyName: string;
  rating: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Testimonial[];
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Color gradients for the avatar backgrounds
  const colorGradients = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500"
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/success-stories');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          // Filter only active testimonials and sort by order
          const activeTestimonials = data.data
            .filter(testimonial => testimonial.isActive)
            .sort((a, b) => a.order - b.order);
          
          setTestimonials(activeTestimonials);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!scrollContainerRef.current || testimonials.length === 0) return;

    const scrollContainer = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          if (scrollContainer.scrollLeft >= maxScrollLeft) {
            // Smooth scroll back to start
            scrollContainer.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Smooth scroll to next position
            scrollContainer.scrollBy({
              left: 400, // Adjust this value to control scroll distance
              behavior: 'smooth'
            });
          }
        }
      }, 3000); // Adjust this value to control scroll speed (3000ms = 3 seconds)
    };

    // Start scrolling after a brief delay
    const startDelay = setTimeout(startScrolling, 1000);

    // Pause scrolling on hover
    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => startScrolling();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startDelay);
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [testimonials]);

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Client Success Stories
            </h2>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Client Success Stories
            </h2>
            <p className="text-gray-600 text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Client Success Stories
          </h2>
          <p className="text-gray-600 mb-4 max-w-3xl mx-auto text-lg">
            Hear from founders and business owners who've experienced the transformation
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-emerald-600" />
              ))}
            </div>
            <span className="font-semibold">4.9/5 from 500+ reviews</span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 pb-6 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-80 md:w-96 snap-start" // Fixed width for consistent sizing
              >
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group h-full">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="h-16 w-16 text-emerald-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(Math.floor(parseFloat(testimonial.rating)))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorGradients[index % colorGradients.length]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {testimonial.clientInitials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.clientName}</h4>
                      <p className="text-sm text-gray-600">{testimonial.designation}</p>
                      <p className="text-xs text-emerald-600 font-medium">{testimonial.companyName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade effects on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Empty State */}
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}