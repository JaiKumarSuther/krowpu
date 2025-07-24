import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Step1 = () => {
  const [title, setTitle] = useState("");

  const exampleTitles = [
    "Build responsive WordPress site with booking/payment functionality",
    "Graphic designer needed to design ad creative",
    "Facebook ad specialist needed for product launch",
    "Create modern React dashboard with real-time analytics",
    "Design minimalist brand identity and logo package"
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  text-sm font-bold">
              1
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Event Post
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-tight">
            Let&apos;s start with a 
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">strong title</span>
          </h2>

          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            This helps your event post stand out and attract the right participants. 
            Make it clear, engaging, and descriptive.
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              Write a title for your event post
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Build responsive WordPress site"
                className="w-full bg-input border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-4 py-4 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200 text-lg"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className={`w-2 h-2 rounded-full transition-colors ${
                  title.length > 10 
                    ? 'bg-[hsl(160_84%_39%)] ' 
                    : 'bg-[hsl(210_40%_96.1%)] -foreground/30'
                }`}></div>
              </div>
            </div>
            {title.length > 0 && (
              <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
                {title.length} characters • Looking good!
              </p>
            )}
          </div>

          {/* Example Titles */}
          <div className="bg-[hsl(160_84%_39%/0.05)]  rounded-lg p-6 border border-[hsl(160_84%_39%/0.1)] ">
            <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%/0.2)]  flex items-center justify-center">
                <FaStar className="w-3 h-3 text-[hsl(160_84%_39%)] " />
              </div>
              Example titles for inspiration
            </h3>
            <div className="space-y-3">
              {exampleTitles.map((example, index) => (
                <div
                  key={index}
                  onClick={() => setTitle(example)}
                  className="group cursor-pointer p-3 rounded-lg bg-[hsl(160_84%_39%/0.05)]  border border-transparent hover:border-[hsl(160_84%_39%/0.2)]  transition-all duration-200"
                >
                  <p className="text-sm text-[hsl(215.4_16.3%_46.9%)]  group-hover:text-[hsl(222.2_84%_4.9%)]  transition-colors">
                    {example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;