"use client";

import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import GreenButton from "@/components/buttons/GreenButton";
import OutlinedGrayButton from "@/components/buttons/OutlinedGrayButton";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(140_20%_98%))]  py-16 px-6 md:px-12 min-h-[600px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-12">
        {/* Left Side */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold italic text-[hsl(140_75%_20%)]  leading-tight mb-6">
            Find the perfect <br />
            <span className="bg-[linear-gradient(135deg,hsl(140_75%_20%),hsl(140_70%_35%))]  bg-clip-text text-transparent">
              freelancer
            </span>{" "}
            in seconds
          </h1>

          <p className="text-[hsl(215.4_16.3%_46.9%)]  text-lg md:text-xl mb-8 max-w-2xl">
            Match with top talent through our revolutionary swipe-based
            platform. Connect, collaborate, and create amazing projects
            together.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-12">
            <GreenButton
              className="rounded-full min-w-[180px] group"
              onClick={() => {
                router.push("/freelancer");
              }}
            >
              <span className="flex items-center justify-center">
                Get Started
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-150"
                />
              </span>
            </GreenButton>

            <OutlinedGrayButton
              className="rounded-full min-w-[180px]"
              onClick={() => {
                router.push("/client");
              }}
            >
              <Play size={18} className="mr-2" />
              Learn how to hire
            </OutlinedGrayButton>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden">
            <Image
              src="/images/freelancer-graphic.png"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
