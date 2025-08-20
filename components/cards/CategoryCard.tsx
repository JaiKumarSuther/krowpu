"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  rating: number;
  skills: number;
}

const CategoryCard = ({ title, rating, skills }: CategoryCardProps) => {
  return (
    <motion.div 
      className="group cursor-pointer bg-[hsl(0_0%_100%)]  border border-[hsl(140_20%_90%)]  rounded-lg p-6 hover:shadow-md hover:border-[hsl(140_75%_20%)/0.2] transition-all duration-150 h-full flex flex-col justify-between min-h-[120px]"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.h3 
          className="text-[hsl(222.2_84%_4.9%)]  font-semibold text-lg mb-3 group-hover:text-[hsl(140_75%_20%)]  transition-colors duration-150"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
      </div>

      <div className="flex items-center justify-between text-sm mt-auto">
        <motion.div 
          className="flex items-center gap-1 text-[hsl(215.4_16.3%_46.9%)] "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </motion.div>
          <span className="font-medium">{rating}</span>
        </motion.div>

        <motion.div 
          className="text-[hsl(215.4_16.3%_65%)] "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {skills.toLocaleString()} skills
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
