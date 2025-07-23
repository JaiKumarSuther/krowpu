import { useRouter } from "next/navigation";

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

const StepNavigator = ({ currentStep, totalSteps, onNext, onBack }: StepNavigatorProps) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={isFirstStep}
        className={`
          inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${isFirstStep
            ? 'opacity-50 cursor-not-allowed text-[hsl(215_20%_65%)]'
            : 'text-[hsl(222.2_84%_4.9%)] hover:text-[hsl(160_84%_39%)] bg-[hsl(210_40%_96.1%)] hover:bg-[hsl(210_40%_92%)] border border-[hsl(214.3_31.8%_91.4%)] hover:border-[hsl(160_84%_39%)/0.3]'
          }
        `}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Step Indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index <= currentStep
                ? 'bg-[hsl(160_84%_39%)] scale-125'
                : 'bg-[hsl(214.3_31.8%_91.4%)] scale-100'
              }
            `}
          />
        ))}
      </div>

      {/* Next/Finish Button */}
      <button
        onClick={onNext}
        disabled={isLastStep}
        className={`
          inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform bg-[hsl(160_84%_39%)] text-white hover:bg-[hsl(160_84%_35%)]
          ${isLastStep
            ? ' shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            : ' shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          }
        `}
      >
        {isLastStep ? (
          <div onClick={() => router.push('/')} className="flex items-center gap-2">
            Create Event
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <>
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default StepNavigator;
