"use client";

import { useState } from "react";
import Step1 from "@/components/client/Step1";
import Step2 from "@/components/client/Step2";
import Step3 from "@/components/client/Step3";
import Step4 from "@/components/client/Step4";
import Step5 from "@/components/client/Step5";
import PostEvent from "@/components/client/PostEvent";
import StepNavigator from "@/components/ui/StepNavigator";
import StepProgressBar from "@/components/ui/StepProgressBar";

const steps = [Step1, Step2, Step3, Step4, Step5, PostEvent];

export default function ClientEventPost() {
  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary-light relative">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[hsl(160_84%_39%/0.05)]  blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(160_84%_39%/0.03)] 3 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          {step < 5 && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(160_84%_39%)] -light rounded-full mb-6">
                <div className="w-2 h-2 bg-[hsl(160_84%_39%)]  rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[hsl(160_84%_39%)] ">
                  Event Creation Wizard
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-4 tracking-tight">
                Create Your Event
              </h1>
              <p className="text-xl text-[hsl(215.4_16.3%_46.9%)]  max-w-2xl mx-auto leading-relaxed">
                Let&apos;s craft something amazing together. Follow these steps to
                create an engaging event post.
              </p>
            </div>
          )}

          {/* Progress bar */}
          {step < 5 && <StepProgressBar currentStep={step} totalSteps={5} />}

          {/* Step card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-elegant border border-[hsl(214.3_31.8%_91.4%)] /50 overflow-hidden">
            <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
              <div className="transition-all duration-500 ease-out transform">
                <CurrentStep />
              </div>

              {step < 5 && (
                <div className="mt-12 pt-8 border-t border-[hsl(214.3_31.8%_91.4%)] /50">
                  <StepNavigator
                    currentStep={step}
                    totalSteps={5}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}