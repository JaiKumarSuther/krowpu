import BrowseEvents from "./BrowseEvents";
import HeroSection from "./HeroSection";
import ImpactfulEventsBanner from "./ImpactfulEventsBanner";
import PricingPlans from "./PricingPlans";
import Footer from "./ui/Footer";
import { motion } from "framer-motion";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={sectionVariants}>
        <HeroSection/>
      </motion.div>
      <motion.div variants={sectionVariants}>
        <BrowseEvents/>
      </motion.div>
      <motion.div variants={sectionVariants}>
        <ImpactfulEventsBanner/>
      </motion.div>
      <motion.div variants={sectionVariants}>
        <PricingPlans/>
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Footer/>
      </motion.div>
    </motion.div>
  );
}