"use client";

import { Star } from "lucide-react";

interface CategoryCardProps {
  title: string;
  rating: number;
  skills: number;
}
const CategoryCard = ({ title, rating, skills }: CategoryCardProps) => {
  return (
    <div className="group cursor-pointer bg-[hsl(0_0%_100%)]  border border-[hsl(140_20%_90%)]  rounded-lg p-6 hover:shadow-md hover:border-[hsl(140_75%_20%)/0.2] transition-all duration-150 h-full flex flex-col justify-between min-h-[120px]">
      <div>
        <h3 className="text-[hsl(222.2_84%_4.9%)]  font-semibold text-lg mb-3 group-hover:text-[hsl(140_75%_20%)]  transition-colors duration-150">
          {title}
        </h3>
      </div>

      <div className="flex items-center justify-between text-sm mt-auto">
        <div className="flex items-center gap-1 text-[hsl(215.4_16.3%_46.9%)] ">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>

        <div className="text-[hsl(215.4_16.3%_65%)] ">
          {skills.toLocaleString()} skills
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
