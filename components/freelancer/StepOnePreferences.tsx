"use client";

import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";

interface Props {
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  error?: string;
  search: string;
  onSearchChange: (value: string) => void;
}

const StepOnePreferences = ({
  selectedSkills,
  onToggleSkill,
  error,
  search,
  onSearchChange,
}: Props) => {
  const allSkills = [
    "WordPress", "Figma", "HTML", "CSS", "UX Design", "UI Design", 
    "Photoshop", "SEO", "Graphic Design", "React", "JavaScript", 
    "Node.js", "Python", "Digital Marketing", "Content Writing"
  ];
  
  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const customSkillExists = search && !allSkills.some(skill => 
    skill.toLowerCase() === search.toLowerCase()
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  text-sm font-bold">
              1
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Freelance Profile Setup
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-tight">
            Let's start with your 
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">preferences</span>
          </h2>
          
          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            Tell us about your skills and expertise. This helps us match you with the right opportunities.
          </p>
        </div>

        <div className="flex-1 space-y-6">
          {/* Skills Search */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              Add your event preferences
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Tags"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[hsl(0_0%_100%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-11 pr-4 py-4 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
            </div>
            <p className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
              For the best results, add 3–5 skills • {selectedSkills.length}/5 selected
            </p>
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
                Selected Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => onToggleSkill(skill)}
                    className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(160_84%_39%/0.9)]  transition-all duration-200 shadow-sm"
                  >
                    {skill}
                    <FaTimes className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Skills */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              {search ? 'Search Results' : 'Popular skills for Events'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(search ? filteredSkills : allSkills.filter(skill => !selectedSkills.includes(skill)))
                .slice(0, 12)
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() => onToggleSkill(skill)}
                    disabled={selectedSkills.length >= 5}
                    className="inline-flex items-center gap-2 bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(210_40%_96.1%)]  hover:border-[hsl(160_84%_39%/0.3)]  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {skill}
                    <div className="w-4 h-4 rounded-full border border-[hsl(215.4_16.3%_46.9%/0.3)]  group-hover:border-[hsl(160_84%_39%)] transition-colors flex items-center justify-center">
                      <FaPlus className="w-2 h-2 text-[hsl(160_84%_39%)]  opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Custom Skill Option */}
          {customSkillExists && selectedSkills.length < 5 && (
            <div className="p-4 bg-[hsl(160_84%_39%/0.1)]  rounded-lg border border-[hsl(160_84%_39%/0.2)] ">
              <p className="text-sm text-[hsl(222.2_84%_4.9%)]  mb-2">Add custom skill:</p>
              <button
                onClick={() => {
                  onToggleSkill(search);
                  onSearchChange("");
                }}
                className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(160_84%_39%/0.9)]  transition-all duration-200"
              >
                Add "{search}"
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-[hsl(0_84.2%_60.2%)] ">{error}</p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-[hsl(210_40%_96.1%)] /50 rounded-lg p-4 border border-[hsl(214.3_31.8%_91.4%)] /50">
            <h4 className="font-medium text-[hsl(222.2_84%_4.9%)]  mb-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%/0.2)]  flex items-center justify-center">
                <span className="text-xs text-[hsl(160_84%_39%)] ">💡</span>
              </div>
              Tips for better matches
            </h4>
            <ul className="text-sm text-[hsl(215.4_16.3%_46.9%)]  space-y-1">
              <li>• Choose skills you're most confident in</li>
              <li>• Include both technical and soft skills</li>
              <li>• Be specific about your areas of expertise</li>
              <li>• You can add custom skills if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOnePreferences;