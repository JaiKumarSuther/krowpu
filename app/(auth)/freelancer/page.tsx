"use client";

import { useState } from "react";
import StepOnePreferences from "@/components/freelancer/StepOnePreferences";
import StepTwoBudget from "@/components/freelancer/StepTwoBudget";
import StepNavigator from "@/components/ui/StepNavigator";
import StepProgressBar from "@/components/ui/StepProgressBar";
import { useRouter } from "next/navigation";

export default function Freelancer() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    skills: [] as string[],
    minRate: "",
    maxRate: "",
    skillSearch: "",
    paymentType: "hourly" as "hourly" | "fixed", // ✅ added
  });

  const [errors, setErrors] = useState({
    skills: "",
    minRate: "",
    maxRate: "",
  });

  const validateStepOne = () => {
    if (formData.skills.length < 3) {
      setErrors((prev) => ({
        ...prev,
        skills: "Please select at least 3 skills.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, skills: "" }));
    return true;
  };

  const validateStepTwo = () => {
    const { minRate, maxRate } = formData;
    let valid = true;
    const updatedErrors = { minRate: "", maxRate: "", skills: "" };

    if (!minRate) {
      updatedErrors.minRate = "Enter minimum rate.";
      valid = false;
    }
    if (!maxRate) {
      updatedErrors.maxRate = "Enter maximum rate.";
      valid = false;
    }
    if (minRate && maxRate && Number(minRate) > Number(maxRate)) {
      updatedErrors.maxRate = "Max must be greater than min.";
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && validateStepOne()) {
      setStep(2);
    } else if (step === 2 && validateStepTwo()) {
      console.log("✅ Submitted Data:", formData);
      router.push("/"); // Navigate to homepage or dashboard
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleRateChange = (field: "minRate" | "maxRate", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skillSearch: value,
    }));
  };

  const handlePaymentTypeChange = (type: "hourly" | "fixed") => {
    console.log("Changing payment type to:", type); // Add this to track the update
    setFormData((prev) => ({
      ...prev,
      paymentType: type,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary-light relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/3 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Freelancer Setup
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Setup Your Profile
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let&apos;s configure your freelance profile to match you with the
              perfect opportunities.
            </p>
          </div>

          {/* Progress bar */}
          <StepProgressBar currentStep={step - 1} totalSteps={2} />

          {/* Step content */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-xl border border-border/50 overflow-hidden">
            <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
              <div className="transition-all duration-500 ease-out transform">
                {step === 1 && (
                  <StepOnePreferences
                    selectedSkills={formData.skills}
                    onToggleSkill={handleSkillToggle}
                    error={errors.skills}
                    search={formData.skillSearch}
                    onSearchChange={handleSearchChange}
                  />
                )}

                {step === 2 && (
                  <StepTwoBudget
                    minRate={formData.minRate}
                    maxRate={formData.maxRate}
                    errorMin={errors.minRate}
                    errorMax={errors.maxRate}
                    onRateChange={handleRateChange}
                    paymentType={formData.paymentType}
                    onPaymentTypeChange={handlePaymentTypeChange} // pass the new function here
                  />
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-border/50">
                <StepNavigator
                  currentStep={step - 1}
                  totalSteps={2}
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
