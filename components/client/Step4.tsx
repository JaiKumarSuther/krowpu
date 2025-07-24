import { useState } from "react";

const Step4 = () => {
  const [budgetType, setBudgetType] = useState<"hourly" | "fixed">("hourly");
  const [hourlyFrom, setHourlyFrom] = useState("");
  const [hourlyTo, setHourlyTo] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] text-sm font-bold">
              4
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Event Post
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-tight">
            Tell us about your 
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">budget</span>
          </h2>
          
          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            This will help us match you to talent within your range and set clear expectations for the project cost.
          </p>
        </div>

        <div className="flex-1 space-y-6">
          {/* Budget Type Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              How would you like to pay?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBudgetType("hourly")}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${budgetType === "hourly" 
                    ? 'border-[hsl(160_84%_39%)]  bg-[hsl(160_84%_39%/0.05)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] ' 
                    : 'border-[hsl(214.3_31.8%_91.4%)]  bg-card hover:border-[hsl(160_84%_39%/0.3)]  bg-[hsl(160_84%_39%/0.05)] '
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${budgetType === "hourly" 
                      ? 'border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%)] ' 
                      : 'border-[hsl(215.4_16.3%_46.9%/0.3)] '
                    }
                  `}>
                    {budgetType === "hourly" && (
                      <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] "></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] ">Hourly rate</h3>
                    <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">Pay by the hour</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setBudgetType("fixed")}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${budgetType === "fixed" 
                    ? 'border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%/0.05)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] ' 
                    : 'border-[hsl(214.3_31.8%_91.4%)]  bg-card hover:border-[hsl(160_84%_39%/0.3)]  bg-[hsl(160_84%_39%/0.05)] '
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${budgetType === "fixed" 
                      ? 'border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%)] ' 
                      : 'border-[hsl(215.4_16.3%_46.9%/0.3)] '
                    }
                  `}>
                    {budgetType === "fixed" && (
                      <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] "></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] ">Fixed price</h3>
                    <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">Pay a set amount</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Budget Input */}
          {budgetType === "hourly" ? (
            <div className="space-y-4">
              <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
                Set your hourly rate range
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[hsl(215.4_16.3%_46.9%)]  block mb-2">From</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)] ">$</span>
                    <input
                      type="number"
                      value={hourlyFrom}
                      onChange={(e) => setHourlyFrom(e.target.value)}
                      placeholder="12"
                      className="w-full bg-input border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-8 pr-12 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)]  text-sm">/hr</span>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="w-8 h-px bg-border"></div>
                </div>
                
                <div className="flex-1">
                  <label className="text-xs text-[hsl(215.4_16.3%_46.9%)]  block mb-2">To</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)] ">$</span>
                    <input
                      type="number"
                      value={hourlyTo}
                      onChange={(e) => setHourlyTo(e.target.value)}
                      placeholder="20"
                      className="w-full bg-input border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-8 pr-12 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)]  text-sm">/hr</span>
                  </div>
                </div>
              </div>
              
              {hourlyFrom && hourlyTo && (
                <div className="bg-[hsl(160_84%_39%/0.05)]  rounded-lg p-4 border border-[hsl(160_84%_39%/0.1)] ">
                  <p className="text-sm text-[hsl(222.2_84%_4.9%)] ">
                    <span className="font-medium">Budget range:</span> ${hourlyFrom} - ${hourlyTo} per hour
                    {parseInt(hourlyFrom) > 0 && parseInt(hourlyTo) > 0 && (
                      <span className="block text-xs text-[hsl(215.4_16.3%_46.9%)]  mt-1">
                        Estimated weekly cost: ${(parseInt(hourlyFrom) * 40).toLocaleString()} - ${(parseInt(hourlyTo) * 40).toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
                Set your project budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)] ">$</span>
                <input
                  type="number"
                  value={fixedPrice}
                  onChange={(e) => setFixedPrice(e.target.value)}
                  placeholder="5,000"
                  className="w-full bg-input border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-8 pr-4 py-4 text-lg text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                />
              </div>
              
              {fixedPrice && (
                <div className="bg-[hsl(160_84%_39%/0.05)]  rounded-lg p-4 border border-[hsl(160_84%_39%/0.1)] ">
                  <p className="text-sm text-[hsl(222.2_84%_4.9%)] ">
                    <span className="font-medium">Total project budget:</span> ${parseInt(fixedPrice).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Budget Tips */}
          <div className="bg-[hsl(210_40%_96.1%)] /50 rounded-lg p-4 border border-[hsl(214.3_31.8%_91.4%)] ">
            <h4 className="font-medium text-[hsl(222.2_84%_4.9%)]  mb-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%/0.2)]  flex items-center justify-center">
                <span className="text-xs text-[hsl(160_84%_39%)] ">💡</span>
              </div>
              Budget Tips
            </h4>
            <ul className="text-sm text-[hsl(215.4_16.3%_46.9%)]  space-y-1">
              <li>• Consider the complexity and scope of your project</li>
              <li>• Research market rates for similar {budgetType === "hourly" ? "hourly work" : "projects"}</li>
              <li>• Factor in revisions and additional requirements</li>
              <li>• Remember that quality work often requires fair compensation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;