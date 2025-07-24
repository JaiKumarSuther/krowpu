"use client";

interface StepProgressBarProps {
  currentStep: number; // 0-indexed
  totalSteps: number;
}

const StepProgressBar = ({ currentStep, totalSteps }: StepProgressBarProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="mb-12">
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-[hsl(160_84%_39%)]  scale-110 shadow-[0_0_0_1px_hsl(160_84%_39%/0.05),0_1px_3px_0_hsl(160_84%_39%/0.1)] "
                    : "bg-[hsl(220_14%_91%)]  scale-100"
                }`}
              ></div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-all duration-500 ${
                    index < currentStep
                      ? "bg-[hsl(160_84%_39%)] "
                      : "bg-[hsl(220_14%_91%)] "
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <span className="text-sm text-[hsl(220_9%_46%)] ">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default StepProgressBar;
