"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import PostEventModal from "@/components/client/PostEventModal";

const PostEvent = () => {
  const [showModal, setShowModal] = useState(false);

  // Sample data - in real app this would come from form state
  const eventData = {
    title: "Build responsive WordPress site",
    category: "Web Design",
    skills: ["WordPress", "JavaScript", "Web Design"],
    scope: "Small, 1 to 3 months, Entry level",
    budget: "I'm not ready to set a budget",
    description: "Clear expectations about your task or deliverables. The skills required for your work. Good communication. Details about how you or your team like to work.",
    attachments: []
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(160_84%_39%)] -light rounded-full mb-6">
          <div className="w-2 h-2 bg-[hsl(160_84%_39%)]  rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-[hsl(160_84%_39%)] ">
            Ready to Post
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-4 tracking-tight">
          Job Details
        </h1>
        <p className="text-xl text-[hsl(215.4_16.3%_46.9%)]  max-w-2xl mx-auto leading-relaxed">
          Review your event details before posting to attract the right talent.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Event Title */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-2">
                {eventData.title}
              </h2>
            </div>
            <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
              <FaEdit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Talent Requirements */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Talent are looking for:</h3>
              <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-2 text-sm text-[hsl(215.4_16.3%_46.9%)] ">
              <li>Clear expectations about your task or deliverables</li>
              <li>The skills required for your work</li>
              <li>Good communication</li>
              <li>Details about how you or your team like to work</li>
            </ul>
          </div>

          {/* Category */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Category</h3>
              <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[hsl(215.4_16.3%_46.9%)] ">{eventData.category}</p>
          </div>

          {/* Skills */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Skills</h3>
              <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[hsl(160_84%_39%/0.1)]  text-[hsl(160_84%_39%)]  rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Scope</h3>
              <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[hsl(215.4_16.3%_46.9%)] ">{eventData.scope}</p>
          </div>

          {/* Budget */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Budget</h3>
              <button className="p-2 text-[hsl(215.4_16.3%_46.9%)]  hover:text-[hsl(160_84%_39%)]  transition-colors">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[hsl(215.4_16.3%_46.9%)] ">{eventData.budget}</p>
          </div>
        </div>

        {/* Optional Sections */}
        <div className="space-y-4">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Screening questions (optional)</h3>
              <button className="text-[hsl(160_84%_39%)]  hover:text-[hsl(160_84%_39%/0.8)] 80 transition-colors text-sm">
                <FaEdit className="w-4 h-4 inline mr-2" />
                Add
              </button>
            </div>
            <p className="text-[hsl(215.4_16.3%_46.9%)]  text-sm">Narrow down your candidates</p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">Advanced preferences (optional)</h3>
              <button className="text-[hsl(160_84%_39%)]  hover:text-[hsl(160_84%_39%/0.8)] 80 transition-colors text-sm">
                <FaEdit className="w-4 h-4 inline mr-2" />
                Add
              </button>
            </div>
            <p className="text-[hsl(215.4_16.3%_46.9%)]  text-sm">Hours per week, hire date, and more</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8">
          <button className="px-6 py-3 border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg text-[hsl(222.2_84%_4.9%)]  hover:bg-[hsl(210_40%_96.1%)]  transition-colors">
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 border border-[hsl(160_84%_39%)] text-[hsl(160_84%_39%)]  rounded-lg bg-[hsl(160_84%_39%/0.05)]  transition-colors">
              Save as a draft
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-lg hover:bg-[hsl(160_84%_39%/0.9)]  transition-colors font-medium"
            >
              Post this Event
            </button>
          </div>
        </div>
      </div>

      <PostEventModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default PostEvent;