"use client";

import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import GreenButton from "@/components/buttons/GreenButton";
import OutlinedGrayButton from "@/components/buttons/OutlinedGrayButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.section 
      className="w-full bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(140_20%_98%))]  py-16 px-6 md:px-12 min-h-[600px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between lg:gap-12">
        {/* Left Side */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold italic text-[hsl(140_75%_20%)]  leading-tight mb-6"
            variants={itemVariants}
          >
            Find the perfect <br />
            <motion.span 
              className="bg-[linear-gradient(135deg,hsl(140_75%_20%),hsl(140_70%_35%))]  bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              freelancer
            </motion.span>{" "}
            in seconds
          </motion.h1>

          <motion.p 
            className="text-[hsl(215.4_16.3%_46.9%)]  text-lg md:text-xl mb-8 max-w-2xl"
            variants={itemVariants}
          >
            Match with top talent through our revolutionary swipe-based
            platform. Connect, collaborate, and create amazing projects
            together.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-12"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GreenButton
                className="rounded-full min-w-[180px] group"
                onClick={() => {
                  router.push("/select-role");
                }}
              >
                <span className="flex items-center justify-center">
                  Get Started
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight
                      size={18}
                      className="ml-2"
                    />
                  </motion.div>
                </span>
              </GreenButton>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OutlinedGrayButton
                className="rounded-full min-w-[180px]"
                onClick={() => {
                }}
              >
                <Play size={18} className="mr-2" />
                Learn how to hire
              </OutlinedGrayButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end"
          variants={imageVariants}
        >
          <motion.div 
            className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src="/images/freelancer-graphic.png"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
