"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Step1 from "@/components/client/Step1";
import Step2 from "@/components/client/Step2";
import Step3 from "@/components/client/Step3";
import Step4 from "@/components/client/Step4";
import Step5 from "@/components/client/Step5";
import StepNavigator from "@/components/ui/StepNavigator";
import StepProgressBar from "@/components/ui/StepProgressBar";

const steps = [Step1, Step2, Step3, Step4, Step5];

export default function ClientEventPost() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const CurrentStep = steps[step];
  const { user, updateUser } = useAuth();
  const router = useRouter();

  // Check if user profile is complete and redirect to dashboard
  useEffect(() => {
    const checkProfileStatus = async () => {
      if (user) {
        // If user profile is complete, redirect to dashboard
        if (user.profileComplete) {
          router.push('/client/dashboard');
          return;
        }
        // If user role is not client, redirect to appropriate page
        if (user.role !== 'client') {
          router.push('/freelancer');
          return;
        }
      }
      setIsLoading(false);
    };

    checkProfileStatus();
  }, [user, router]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Submitting form... 🚀");
      
      // Update user profile as complete
      if (user) {
        updateUser({ profileComplete: true });
      }
      
      // Navigate to dashboard
      router.push("/client/dashboard");
    }
  };

  const handleBack = () => step > 0 && setStep(step - 1);

  // Show loading while checking profile status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(0_0%_99%)]  via-[hsl(220_14%_96%)] to-[hsl(160_60%_95%)] relative">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[hsl(160_84%_39%)/0.05] blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(160_84%_39%)/0.03] blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(220_13%_13%)]  mb-4 tracking-tight">
              Create Your Event
            </h1>
            <p className="text-xl text-[hsl(220_9%_46%)]  max-w-2xl mx-auto leading-relaxed">
              Let&apos;s craft something amazing together. Follow these steps to
              create an engaging event post.
            </p>
          </div>

          {/* Progress bar */}
          <StepProgressBar currentStep={step} totalSteps={5} />

          {/* Step card */}
          <div className="bg-[hsl(0_0%_100%)/0.8] backdrop-blur-sm rounded-xl shadow-xl border border-[hsl(220_14%_91%)] overflow-hidden">
            <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
              <div className="transition-all duration-500 ease-out transform">
                <CurrentStep />
              </div>

              <div className="mt-12 pt-8 border-t border-[hsl(220_14%_91%)/0.5]">
                <StepNavigator
                  currentStep={step}
                  totalSteps={steps.length}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
