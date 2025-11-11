import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  BookOpen, 
  Landmark, 
  FolderArchive, 
  Calculator,
  FileText,
  Settings,
  Rocket
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-[#CFE4D1] group">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-[#CFE4D1] rounded-2xl flex items-center justify-center mb-6 text-gray-800 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      title: "Business Setup",
      description: "Free Zone & Mainland in Dubai, Sharjah, Ajman, RAK, UAQ, Fujairah & Abu Dhabi.",
      icon: <Building2 size={32} />
    },
    {
      title: "Finding Virtual, Rented & Owned Office",
      description: "We help you secure the perfect physical or virtual space for your operations.",
      icon: <Home size={32} />
    },
    {
      title: "Book Keeping",
      description: "Handling sales, purchase, receipts, payments & other business transactions.",
      icon: <BookOpen size={32} />
    },
    {
      title: "Bank Account Opening Assistance",
      description: "Navigating the process of setting up your corporate bank accounts with ease.",
      icon: <Landmark size={32} />
    },
    {
      title: "Collecting & Storing Digital Documents",
      description: "Secure management of your essential transaction records and company documents.",
      icon: <FolderArchive size={32} />
    },
    {
      title: "Payroll",
      description: "Monthly salary processing, including benefits, attendance, and employee details.",
      icon: <Calculator size={32} />
    },
    {
      title: "Corporate Tax & VAT Registration",
      description: "Ensuring your business is compliant with all local tax registration and filing requirements.",
      icon: <FileText size={32} />
    },
    {
      title: "Providing Accounting Software",
      description: "Access to leading accounting software on the cloud for seamless financial management.",
      icon: <Settings size={32} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0f7f2]">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services Covered
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We handle the complexities, so you can focus on building your business.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-[#CFE4D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Rocket size={64} className="mx-auto mb-6 text-gray-800" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Launch?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Let's talk about how we can help your startup succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ServicesSection;