"use client";

import { ArrowRight, TrendingUp } from "lucide-react";
import CategoryCard from "@/components/cards/CategoryCard";

const BrowseEvents = () => {
  const categories = [
    { title: "Development & IT", rating: 4.85, skills: 1853 },
    { title: "Graphic Design & Creative", rating: 4.91, skills: 968 },
    { title: "Sales & Marketing", rating: 4.77, skills: 392 },
    { title: "Copy Writing & Translation", rating: 4.92, skills: 505 },
    { title: "Admin & Customer Support", rating: 4.66, skills: 508 },
    { title: "Finance & Accounting", rating: 4.77, skills: 214 },
    { title: "Engineering & Architecture", rating: 4.83, skills: 756 },
    { title: "Legal Services", rating: 4.85, skills: 145 },
  ];

  return (
    <section className="max-w-7xl  bg-white mx-auto px-6 md:px-12 pt-8" id="events-section">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[hsl(140_30%_95%)]  px-4 py-2 rounded-full mb-4">
          <TrendingUp size={16} className="text-[hsl(140_75%_20%)] " />
          <span className="text-[hsl(215.4_16.3%_46.9%)]  font-medium text-sm">
            Most Popular Categories
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-4">
          Browse events by category
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[hsl(215.4_16.3%_46.9%)] ">
          <span>Looking for work?</span>
          <button className="text-[hsl(140_75%_20%)]  font-semibold hover:text-[hsl(140_80%_15%)]  transition-colors duration-150 inline-flex items-center gap-1 group">
            Browse all events
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-150"
            />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category, index) => (
          <div key={index} className="h-full">
            <CategoryCard
              title={category.title}
              rating={category.rating}
              skills={category.skills}
            />
          </div>
        ))}
      </div>

      
    </section>
  );
};

export default BrowseEvents;
