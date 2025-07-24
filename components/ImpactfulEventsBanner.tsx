"use client";

import Image from "next/image";
import { CheckCircle, Target, Zap } from "lucide-react";

const ImpactfulEventsBanner = () => {
  const features = [
    {
      icon: <Target className="text-[hsl(140_70%_50%)] " size={20} />,
      text: "Browse event listings and discover exciting collaboration opportunities.",
    },
    {
      icon: <Zap className="text-[hsl(140_70%_50%)] " size={20} />,
      text: "Send your proposal to organizers showcasing your skills and ideas.",
    },
    {
      icon: <CheckCircle className="text-[hsl(140_70%_50%)] " size={20} />,
      text: "Once selected, complete the task and receive secure payment.",
    },
  ];

  return (
    <section className="max-w-7xl bg-white mx-auto px-6 md:px-12 pt-8" id="about-section">
      <div className="flex flex-col lg:flex-row bg-[#165c4d] rounded-xl overflow-hidden">
        {/* Left Side Content */}
        <div className="flex-1 p-10 text-white flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wide mb-4">
            Powering the Future of Events – Together
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            Creating{" "}
            <span className="text-[#96CC90]">Impactful Events</span>,<br />
            One Match at a Time
          </h2>

          <p className="text-white/80 mb-8 text-base leading-relaxed max-w-lg">
            Join a growing community of event professionals and collaborators.
            Whether you&apos;re hosting or contributing, we make event creation
            simple and successful.
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">{feature.icon}</div>
                <span className="text-white/90 leading-relaxed">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <button className="bg-white text-[#165c4d] font-semibold rounded-full px-6 py-3 hover:bg-white/90 transition">
            Learn more
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-[500px]">
          <Image
            src="/images/hero-banner.jpg"
            alt="Impactful Events"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactfulEventsBanner;
