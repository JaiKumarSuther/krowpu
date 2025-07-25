import { useState } from "react";

const Step2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const popularSkills = [
    "WordPress", "React", "JavaScript", "UI/UX Design", "Node.js",
    "Python", "Graphic Design", "Digital Marketing", "SEO"
  ];

  const allSkills = [
    ...popularSkills,
    "Vue.js", "Angular", "TypeScript", "CSS", "HTML", "Figma", "Adobe Creative Suite",
    "Social Media Marketing", "Content Writing", "Video Editing", "Photography"
  ];

  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-8 text-black">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  text-sm font-bold">
              2
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Event Post
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-tight">
            What are the main
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">skills required?</span>
          </h2>

          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            Help participants understand what expertise they need. Choose the most relevant skills for your event.
          </p>
        </div>

        {/* Right Form */}
        <div className="flex-1 space-y-6">

          {/* Skill Search */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              Search skills or add your own
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tags..."
                className="w-full bg-input border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-4 py-4 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-[hsl(215.4_16.3%_46.9%)] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
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
                {selectedSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(160_84%_39%/0.9)]  transition-all duration-200 shadow-sm"
                  >
                    {skill}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular/Search Results */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block">
              {searchTerm ? 'Search Results' : 'Popular skills for Jobs'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(searchTerm ? filteredSkills : popularSkills)
                .filter(skill => !selectedSkills.includes(skill))
                .slice(0, 9)
                .map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    disabled={selectedSkills.length >= 5}
                    className="inline-flex items-center gap-2 bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(210_40%_96.1%)] /80 hover:border-[hsl(160_84%_39%/0.3)]  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {skill}
                    <div className="w-5 h-5 rounded-full border-2 border-[hsl(215.4_16.3%_46.9%/0.3)]  group-hover:border-[hsl(160_84%_39%)] transition-colors flex items-center justify-center">
                      <svg className="w-3 h-3 text-[hsl(160_84%_39%)]  opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Add custom skill */}
          {searchTerm && !allSkills.some(skill => skill.toLowerCase() === searchTerm.toLowerCase()) && selectedSkills.length < 5 && (
            <div className="p-4 bg-[hsl(160_84%_39%/0.1)]  rounded-lg border border-[hsl(160_84%_39%/0.2)] ">
              <p className="text-sm text-[hsl(222.2_84%_4.9%)]  mb-2">Add custom skill:</p>
              <button
                onClick={() => {
                  toggleSkill(searchTerm);
                  setSearchTerm("");
                }}
                className="inline-flex items-center gap-2 bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  rounded-full px-4 py-2 text-sm font-medium hover:bg-[hsl(160_84%_39%/0.9)]  transition-all duration-200"
              >
                Add &quot;{searchTerm}&quot;
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;