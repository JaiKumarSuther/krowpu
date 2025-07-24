"use client";

import { FaTimes } from "react-icons/fa";

interface PostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostEventModal = ({ isOpen, onClose }: PostEventModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elegant max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(222.2_84%_4.9%)]  transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[hsl(160_84%_39%/0.1)]  rounded-2xl flex items-center justify-center relative">
            {/* Phone Icon */}
            <div className="w-12 h-16 bg-foreground rounded-lg flex items-center justify-center relative">
              <div className="w-8 h-10 bg-card rounded-sm relative">
                {/* Checkmarks */}
                <div className="absolute -top-2 -left-2 w-5 h-5 bg-[hsl(160_84%_39%)]  rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-[hsl(0_0%_100%)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -top-1 left-2 w-4 h-4 bg-[hsl(160_84%_39%)]  rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[hsl(0_0%_100%)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute top-1 left-4 w-4 h-4 bg-[hsl(160_84%_39%)]  rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[hsl(0_0%_100%)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                {/* Large checkmark */}
                <div className="absolute top-1 right-0 w-6 h-6 bg-[hsl(160_84%_39%)]  rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[hsl(0_0%_100%)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              {/* Phone bottom */}
              <div className="absolute bottom-1 w-2 h-2 bg-[hsl(210_40%_96.1%)] -foreground rounded-full"></div>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-[hsl(160_84%_39%)]  rounded-full animate-pulse"></div>
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-[hsl(0_0%_100%)]  rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">
            What happens after you post your Event?
          </h2>
          
          <p className="text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            You&apos;ll receive proposals and you can invite talent event. No charges until you hire.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-[hsl(160_84%_39%)] text-[hsl(160_84%_39%)]  rounded-lg bg-[hsl(160_84%_39%/0.05)]  transition-colors font-medium"
          >
            Save as a draft
          </button>
          <button
            onClick={() => {
              // Handle posting logic here
              console.log("Event posted!");
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-lg hover:bg-[hsl(160_84%_39%/0.9)]  transition-colors font-medium"
          >
            Post this job
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEventModal;