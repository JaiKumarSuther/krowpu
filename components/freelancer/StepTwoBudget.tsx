"use client";

import {
  FaClock,
  FaFileInvoiceDollar,
  FaDollarSign,
  FaLightbulb,
} from "react-icons/fa";

interface Props {
  minRate: string;
  maxRate: string;
  errorMin?: string;
  errorMax?: string;
  paymentType: "hourly" | "fixed";
  onRateChange: (field: "minRate" | "maxRate", value: string) => void;
  onPaymentTypeChange: (type: "hourly" | "fixed") => void;
}

const StepTwoBudget = ({
  minRate,
  maxRate,
  errorMin,
  errorMax,
  paymentType = "hourly",
  onRateChange,
  onPaymentTypeChange,
}: Props) => {
  const calculateWeeklyRange = () => {
    if (paymentType !== "hourly") return null;

    const min = parseFloat(minRate) || 0;
    const max = parseFloat(maxRate) || 0;

    if (min > 0 && max > 0) {
      return {
        min: (min * 40).toLocaleString(),
        max: (max * 40).toLocaleString(),
      };
    }

    return null;
  };

  const weeklyRange = calculateWeeklyRange();

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  text-sm font-bold">
              2
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Profile Setup
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-tight">
            Tell us about your
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">
              budget
            </span>
          </h2>

          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            This will help us match you to events within your desired rate range
            and set proper expectations.
          </p>
        </div>

        <div className="flex-1 space-y-6">
          {/* Payment Type Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              Preferred payment structure
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Hourly Card */}
              <div
                onClick={() => onPaymentTypeChange("hourly")}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  paymentType === "hourly"
                    ? "border-[hsl(160_84%_39%)]  bg-[hsl(160_84%_39%/0.1)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] "
                    : "border-[hsl(214.3_31.8%_91.4%)]  bg-[hsl(210_40%_96.1%)] hover:bg-[hsl(210_40%_96.1%)] "
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaClock
                    className={`w-5 h-5 ${
                      paymentType === "hourly"
                        ? "text-[hsl(160_84%_39%)] "
                        : "text-[hsl(215.4_16.3%_46.9%)] "
                    }`}
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        paymentType === "hourly"
                          ? "text-[hsl(222.2_84%_4.9%)] "
                          : "text-[hsl(215.4_16.3%_46.9%)] "
                      }`}
                    >
                      Hourly
                    </h3>
                    <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
                      Pay per hour worked
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentType === "hourly"
                        ? "border-[hsl(160_84%_39%)]  bg-[hsl(160_84%_39%)] "
                        : "border-[hsl(215.4_16.3%_46.9%/0.3)] "
                    }`}
                  >
                    {paymentType === "hourly" && (
                      <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] " />
                    )}
                  </div>
                </div>
              </div>

              {/* Fixed Price Card */}
              <div
                onClick={() => onPaymentTypeChange("fixed")}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  paymentType === "fixed"
                    ? "border-[hsl(160_84%_39%)]  bg-[hsl(160_84%_39%/0.1)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] "
                    : "border-[hsl(214.3_31.8%_91.4%)]  bg-[hsl(210_40%_96.1%)]  hover:bg-[hsl(210_40%_96.1%)] "
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaFileInvoiceDollar
                    className={`w-5 h-5 ${
                      paymentType === "fixed"
                        ? "text-[hsl(160_84%_39%)] "
                        : "text-[hsl(215.4_16.3%_46.9%)] "
                    }`}
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        paymentType === "fixed"
                          ? "text-[hsl(222.2_84%_4.9%)] "
                          : "text-[hsl(215.4_16.3%_46.9%)] "
                      }`}
                    >
                      Fixed price
                    </h3>
                    <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
                      Set project rate
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentType === "fixed"
                        ? "border-[hsl(160_84%_39%)]  bg-[hsl(160_84%_39%)] "
                        : "border-[hsl(215.4_16.3%_46.9%/0.3)] "
                    }`}
                  >
                    {paymentType === "fixed" && (
                      <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] " />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Range OR Fixed Budget */}
          {paymentType === "hourly" ? (
            <div className="space-y-4">
              <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
                Set your hourly rate range
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[hsl(215.4_16.3%_46.9%)]  block mb-2">
                    From
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                    <input
                      type="number"
                      value={minRate}
                      onChange={(e) => onRateChange("minRate", e.target.value)}
                      placeholder="12.00"
                      className="w-full bg-[hsl(0_0%_100%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-10 pr-12 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)]  text-sm">
                      /hr
                    </span>
                  </div>
                  {errorMin && (
                    <p className="text-[hsl(0_84.2%_60.2%)]  text-xs mt-1">
                      {errorMin}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <div className="w-8 h-px bg-border"></div>
                </div>

                <div className="flex-1">
                  <label className="text-xs text-[hsl(215.4_16.3%_46.9%)]  block mb-2">
                    To
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                    <input
                      type="number"
                      value={maxRate}
                      onChange={(e) => onRateChange("maxRate", e.target.value)}
                      placeholder="25.00"
                      className="w-full bg-[hsl(0_0%_100%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-10 pr-12 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215.4_16.3%_46.9%)]  text-sm">
                      /hr
                    </span>
                  </div>
                  {errorMax && (
                    <p className="text-[hsl(0_84.2%_60.2%)]  text-xs mt-1">
                      {errorMax}
                    </p>
                  )}
                </div>
              </div>

              {/* Weekly Range */}
              {weeklyRange && (
                <div className="bg-[hsl(160_84%_39%/0.1)]  rounded-lg p-4 border border-[hsl(160_84%_39%/0.2)] ">
                  <p className="text-sm text-[hsl(222.2_84%_4.9%)] ">
                    <span className="font-medium">
                      Estimated weekly earnings:
                    </span>{" "}
                    ${weeklyRange.min} - ${weeklyRange.max}
                    <span className="block text-xs text-[hsl(215.4_16.3%_46.9%)]  mt-1">
                      Based on 40 hours per week
                    </span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
                Enter your fixed project budget
              </label>
              <div className="relative w-full">
                <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                <input
                  type="number"
                  value={maxRate}
                  onChange={(e) => onRateChange("maxRate", e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full bg-[hsl(0_0%_100%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-10 pr-4 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
                />
                {errorMax && (
                  <p className="text-[hsl(0_84.2%_60.2%)]  text-xs mt-1">{errorMax}</p>
                )}
              </div>
            </div>
          )}

          {/* Market Info */}
          <div className="bg-[hsl(210_40%_96.1%)] /50 rounded-lg p-4 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
              This is the average rate for similar freelancers in your skill
              area.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-[hsl(210_40%_96.1%)] /50 rounded-lg p-4 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <h4 className="font-medium text-[hsl(222.2_84%_4.9%)]  mb-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%/0.2)]  flex items-center justify-center">
                <FaLightbulb className="w-3 h-3 text-[hsl(160_84%_39%)] " />
              </div>
              Rate Setting Tips
            </h4>
            <ul className="text-sm text-[hsl(215.4_16.3%_46.9%)]  space-y-1">
              <li>• Research market rates for your skills and experience</li>
              <li>• Consider your expertise level and portfolio quality</li>
              <li>• Factor in project complexity and deadlines</li>
              <li>• Start competitive and adjust based on demand</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoBudget;