"use client";

import { Check, X, Star, Zap, Crown } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    icon: <Star size={20} />,
    features: [
      { text: "Browse events", included: true },
      { text: "Send up to 5 proposals/month", included: true },
      { text: "Basic profile visibility", included: true },
      { text: "No priority placement", included: false },
      { text: "No analytics", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    description: "Best for active freelancers",
    popular: true,
    icon: <Zap size={20} />,
    features: [
      { text: "Unlimited proposals", included: true },
      { text: "Priority placement in search", included: true },
      { text: "Event insights & stats", included: true },
      { text: "Highlighted profile", included: true },
      { text: "Early access to select events", included: true },
    ],
  },
  {
    name: "Premium",
    price: "$19.99/mo",
    description: "For serious event organizers",
    icon: <Crown size={20} />,
    features: [
      { text: "Post unlimited events", included: true },
      { text: "Advanced team collaboration", included: true },
      { text: "Proposal filtering tools", included: true },
      { text: "Organizer analytics dashboard", included: true },
      { text: "Promote your events", included: true },
    ],
  },
];

const PricingPlans = () => {
  return (
    <section className="max-w-7xl bg-white mx-auto px-4 sm:px-6 md:px-12">
      <div className="bg-gradient-to-b from-white to-[hsl(140_20%_98%)] rounded-xl overflow-hidden p-6 sm:p-8 md:p-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[hsl(140_60%_85%)] px-3 py-1 rounded-full mb-5">
            <Crown size={14} className="text-[hsl(160_84%_39%)]" />
            <span className="text-[hsl(160_84%_39%)] font-medium text-sm">For All Users</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-[hsl(222.2_84%_4.9%)]">
            Choose the Plan That Fits You
          </h2>

          <p className="text-[hsl(215.4_16.3%_46.9%)] max-w-2xl mx-auto text-base sm:text-lg">
            Start for free, upgrade anytime. Whether you&apos;re just exploring or ready to scale your impact — we&apos;ve got a plan for you.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border rounded-xl p-6 flex flex-col transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-[hsl(160_84%_39%)] scale-[1.02]"
                  : "border-[hsl(140_20%_90%)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-[hsl(160_84%_39%)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-5">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  plan.popular
                    ? "bg-[hsl(160_84%_39%)] text-white"
                    : "bg-[hsl(140_60%_85%)] text-[hsl(160_84%_39%)]"
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-lg font-bold mb-1 text-black">{plan.name}</h3>
                <p className="text-[hsl(215.4_16.3%_46.9%)] text-sm">{plan.description}</p>

                <div className="mt-4 mb-6">
                  <span className="text-2xl text-black font-bold">{plan.price}</span>
                  {plan.price !== "$0" && (
                    <span className="text-sm ml-1 text-[hsl(215.4_16.3%_65%)]">/mo</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 text-sm flex-1 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div
                      className={`p-1 rounded-full flex-shrink-0 ${
                        feature.included
                          ? "bg-[hsl(140_70%_50%)/0.2]"
                          : "bg-[hsl(0_84.2%_60.2%)/0.2]"
                      }`}
                    >
                      {feature.included ? (
                        <Check size={14} className="text-[hsl(140_70%_50%)]" />
                      ) : (
                        <X size={14} className="text-[hsl(0_84.2%_60.2%)]" />
                      )}
                    </div>
                    <span
                      className={`${
                        feature.included
                          ? "text-[hsl(222.2_84%_4.9%)]"
                          : "text-[hsl(215.4_16.3%_65%)]"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 text-sm font-semibold rounded-lg transition ${
                  plan.popular
                    ? "bg-[hsl(160_84%_39%)] text-white hover:bg-[hsl(160_84%_29%)]"
                    : "bg-[hsl(140_30%_95%)] text-[hsl(222.2_84%_4.9%)] hover:bg-[hsl(160_84%_39%)] hover:text-white"
                }`}
              >
                {plan.price === "$0" ? "Get Started Free" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-[hsl(215.4_16.3%_46.9%)] text-xs">
          24/7 support and 30-day money-back guarantee included.
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
