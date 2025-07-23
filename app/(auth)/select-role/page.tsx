"use client";

import { useRouter } from "next/navigation";
import { FaUser, FaBriefcase, FaArrowRight } from "react-icons/fa";

const Index = () => {
  const router = useRouter();

  const handleRoleSelect = (role: "client" | "freelancer") => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen relative bg-[hsl(0_0%_100%)] text-[hsl(222.2_84%_4.9%)]">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[hsl(160_84%_39%)/0.05] blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(160_84%_39%)/0.03] blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="mb-16">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(160_60%_95%)] rounded-full mb-8">
              <div className="w-2 h-2 bg-[hsl(160_84%_39%)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[hsl(160_84%_39%)]">Event Platform</span>
            </div> */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome to <span className="text-[hsl(160_84%_39%)]">KROWPU</span>
            </h1>
            <p className="text-xl text-[hsl(215.4_16.3%_46.9%)] max-w-2xl mx-auto leading-relaxed">
              Connect clients with talented freelancers, or showcase your skills to find amazing opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Client Card */}
            <div className="group">
              <div className="bg-[hsl(0_0%_100%)/0.8] backdrop-blur-sm rounded-xl border border-[hsl(214.3_31.8%_91.4%)/0.5] p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:-translate-y-2 hover:border-[hsl(160_84%_39%)/0.3]">
                <div className="w-16 h-16 bg-[hsl(160_84%_39%)/0.1] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[hsl(160_84%_39%)/0.2] transition-colors">
                  <FaBriefcase className="w-8 h-8 text-[hsl(160_84%_39%)]" />
                </div>
                <h2 className="text-2xl font-bold mb-4">I&apos;m a Client</h2>
                <p className="text-[hsl(215.4_16.3%_46.9%)] mb-8 leading-relaxed">
                  Post your project and find the perfect freelancer to bring your vision to life. Get started with our easy step-by-step process.
                </p>
                <button
                  onClick={() => handleRoleSelect("client")}
                  className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[hsl(160_84%_39%)/0.9] transition-all duration-200 shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:shadow-[0_0_40px_hsl(160_84%_50%/0.4)] hover:-translate-y-0.5 group"
                >
                  Create Event Post
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Freelancer Card */}
            <div className="group">
              <div className="bg-[hsl(0_0%_100%)/0.8] backdrop-blur-sm rounded-xl border border-[hsl(214.3_31.8%_91.4%)/0.5] p-8 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:-translate-y-2 hover:border-[hsl(160_84%_39%)/0.3]">
                <div className="w-16 h-16 bg-[hsl(160_84%_39%)/0.1] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[hsl(160_84%_39%)/0.2] transition-colors">
                  <FaUser className="w-8 h-8 text-[hsl(160_84%_39%)]" />
                </div>
                <h2 className="text-2xl font-bold mb-4">I&apos;m a Freelancer</h2>
                <p className="text-[hsl(215.4_16.3%_46.9%)] mb-8 leading-relaxed">
                  Set up your profile and start receiving project invitations that match your skills and preferred rates.
                </p>
                <button
                  onClick={() => handleRoleSelect("freelancer")}
                  className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[hsl(160_84%_39%)/0.9] transition-all duration-200 shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:shadow-[0_0_40px_hsl(160_84%_50%/0.4)] hover:-translate-y-0.5 group"
                >
                  Setup Profile
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
