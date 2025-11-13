// 'use client'
// import { Calendar, Download, FileText, Clock } from "lucide-react";
// import QuizCard from "./cards";
// import { useCurrentUser } from "@/hooks/auth";
// import { useSession } from "next-auth/react";
// import UserNavbar from "../Homepage/usernavbar";

// const DashboardContent = () => {
//     const user =useCurrentUser();
//       const { status } = useSession();

//     console.log("asdffffff",user?.email);
//     const recentActivities = [
//         {
//             type: "Profile updated successfully",
//             description: "Changed your primary contact number.",
//             time: "2 days ago",
//             icon: "profile"
//         },
//         {
//             type: "Report downloaded",
//             description: "Q3 Financial Summary.pdf",
//             time: "5 days ago",
//             icon: "download"
//         },
//         {
//             type: "Consultation completed",
//             description: "With Jane Smith",
//             time: "1 week ago",
//             icon: "consultation"
//         }
//     ];

//     const getActivityIcon = (iconType: string) => {
//         switch (iconType) {
//             case "profile":
//                 return <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">👤</div>;
//             case "download":
//                 return <Download className="w-5 h-5 text-gray-600" />;
//             case "consultation":
//                 return <FileText className="w-5 h-5 text-gray-600" />;
//             default:
//                 return <div className="w-6 h-6 bg-gray-100 rounded-full"></div>;
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto px-12 py-8">
//             {/* Welcome Section */}
//             {/* <UserNavbar /> */}
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                     Welcome back, {user?.name}!
//                 </h1>
//                 <p className="text-gray-600">Here's what's happening today.</p>
//             </div>

//           <div className=" flex flex-col lg:flex-row gap-8">
//   {/* Left Column - Cards Side by Side */}
//   <div className="flex-1 flex flex-col md:flex-row gap-10">
//                     {/* Book Consultation Card */}

//                     <QuizCard
//         title="Book A Consultation"
//         description="Get personalized advice from our experts to help you achieve your goals."
//         time="30 minutes"
//         buttonText="Book Consultation"
//         buttonRoute="/dashboard/user/book-consultation"
//         imageSrc="/basic2.gif"
//       />
//          <QuizCard
//         title="Take the Strategy Quiz"
//         description="Discover your strengths and unlock new strategies for success."
//         time="5 minutes"
//         buttonText="Start Quiz"
//         buttonRoute="/dashboard/user/questionnaire"
//         imageSrc="/strategyQuiz.gif" // replace with your image path
//       />
           
//                 </div>



//             </div>

           
//             </div>
//     );
// };

// export default DashboardContent;


'use client'
import { Calendar, Download, FileText, Clock } from "lucide-react";
import QuizCard from "./cards";
import { useCurrentUser } from "@/hooks/auth";
import { useSession } from "next-auth/react";
import UserNavbar from "../Homepage/usernavbar";
import { memo } from "react";

const DashboardContent = () => {
    const user = useCurrentUser();
    const { status } = useSession();

    // Show loading state immediately
    if (status === "loading") {
        return (
            <div className="max-w-6xl mx-auto px-12 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 flex flex-col md:flex-row gap-10">
                            <div className="flex-1 h-64 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-64 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-12 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">Here's what's happening today.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Cards Side by Side */}
                <div className="flex-1 flex flex-col md:flex-row gap-10">
                    {/* Book Consultation Card */}
                    <QuizCard
                        title="Book A Consultation"
                        description="Get personalized advice from our experts to help you achieve your goals."
                        time="30 minutes"
                        buttonText="Book Consultation"
                        buttonRoute="/dashboard/user/book-consultation"
                        imageSrc="/basic2.gif"
                    />
                    <QuizCard
                        title="Take the Strategy Quiz"
                        description="Discover your strengths and unlock new strategies for success."
                        time="5 minutes"
                        buttonText="Start Quiz"
                        buttonRoute="/dashboard/user/questionnaire"
                        imageSrc="/strategyQuiz.gif"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(DashboardContent);