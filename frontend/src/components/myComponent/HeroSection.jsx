import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, GraduationCap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <>
      <main className="flex-grow">
        <section className="bg-custom">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
              <div className="text-white">
                {" "}
                <h1 className="text-5xl font-bold leading-tight mb-6">
                  Find Your Dream Job Today
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Connect with thousands of employers and discover opportunities
                  that match your skills and aspirations. Your next career move
                  starts here.
                </p>{" "}
                <div className="flex gap-[1rem]">
                  <button onClick={()=>{navigate("/jobs")}} className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Find Jobs
                  </button>
                  <button onClick={()=>{navigate("/admin/jobs/create")}} className=" bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Post Jobs
                  </button>
                 
                </div>{" "}
              </div>
              <div className="relative h-[500px]">
                <img
                  src="/photo.jpg"
                  alt="Professional workplace"
                  className="absolute inset-0 w-full h-full object-contain"
                />{" "}
              </div>
            </div>
          </div>
        </section>
     

      <div className="min-h-[100%] text-white">
        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 ">Why Choose JobFinder?</h1>
          <p className="text-gray-400 mb-16">
            We connect talented professionals with leading companies
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <Card className="bg-[#0F111A]/50 border-gray-800">
              <CardHeader>
                <Search className="w-12 h-12 mb-4 text-blue-500" />
                <CardTitle className="text-[2rem] mb-2 text-white">
                  Find Perfect Jobs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Access to countless job opportunities across various industries
                and locations.
              </CardContent>
            </Card>

            <Card className="bg-[#0F111A]/50 border-gray-800">
              <CardHeader>
                <Building2 className="w-12 h-12 mb-4 text-blue-500" />
                <CardTitle className="text-[2rem] mb-2 text-white">
                  Top Companies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Partner with leading employers looking for talented
                professionals like you.
              </CardContent>
            </Card>

            <Card className="bg-[#0F111A]/50 border-gray-800">
              <CardHeader>
                <GraduationCap className="w-12 h-12 mb-4 text-blue-500" />
                <CardTitle className="text-[2rem] mb-2 text-white">
                  Career Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Resources and tools to help you advance in your professional
                journey.
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      </main>
    </>
  );
};

export default HeroSection;
