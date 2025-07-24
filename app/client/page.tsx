"use client";

import { useState } from "react";
import Step1 from "@/components/client/Step1";
import Step2 from "@/components/client/Step2";
import Step3 from "@/components/client/Step3";
import Step4 from "@/components/client/Step4";
import Step5 from "@/components/client/Step5";
import StepNavigator from "@/components/ui/StepNavigator";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { useRouter } from "next/navigation";

const steps = [Step1, Step2, Step3, Step4, Step5];

export default function ClientEventPost() {
  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];

  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Submitting form... 🚀");
      router.push("/"); // Final redirect from inside top-level component
    }
  };

  const handleBack = () => step > 0 && setStep(step - 1);

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
