import { useState } from "react";
import {
  FaBuilding,
  FaBullseye,
  FaBolt,
  FaRocket,
  FaCalendar,
  FaCalendarDays,
  FaChartBar,
  FaSeedling,
  FaArrowTrendUp,
  FaTrophy,
} from "react-icons/fa6";

const Step3 = () => {
  const [selectedScope, setSelectedScope] = useState("Medium");
  const [selectedDuration, setSelectedDuration] = useState("1-3 months");
  const [selectedExperience, setSelectedExperience] = useState("Expert");

  const scopes = [
    {
      name: "Large",
      description:
        "Complex project with multiple phases, extensive features, and significant scope",
      icon: FaBuilding,
      details: "Multiple team members, 3+ months timeline",
    },
    {
      name: "Medium",
      description:
        "Standard project with defined requirements and moderate complexity",
      icon: FaBullseye,
      details: "1-2 team members, 1-3 months timeline",
    },
    {
      name: "Small",
      description: "Simple project with clear scope and quick turnaround",
      icon: FaBolt,
      details: "Individual contributor, less than 1 month",
    },
  ];

  const durations = [
    {
      name: "Less than 1 month",
      description: "Quick turnaround for urgent or simple projects",
      icon: FaRocket,
    },
    {
      name: "1-3 months",
      description: "Standard timeline for most projects with proper planning",
      icon: FaCalendar,
    },
    {
      name: "3-6 months",
      description: "Extended timeline for complex or phased implementations",
      icon: FaCalendarDays,
    },
    {
      name: "6+ months",
      description: "Long-term commitment for enterprise or ongoing projects",
      icon: FaChartBar,
    },
  ];

  const experiences = [
    {
      name: "Entry Level",
      description: "New to the field, willing to learn and grow with guidance",
      icon: FaSeedling,
      details: "0-2 years experience",
    },
    {
      name: "Intermediate",
      description:
        "Some experience with proven track record in similar projects",
      icon: FaArrowTrendUp,
      details: "2-5 years experience",
    },
    {
      name: "Expert",
      description:
        "Extensive experience with leadership and complex problem-solving skills",
      icon: FaTrophy,
      details: "5+ years experience",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)]  text-[hsl(0_0%_100%)]  text-sm font-bold">
              3
            </div>
            <span className="text-sm font-medium text-[hsl(215.4_16.3%_46.9%)]  tracking-wider uppercase">
              Event Post
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(222.2_84%_4.9%)]  leading-snug tracking-tight">
            Next, estimate the
            <span className="text-[hsl(160_84%_39%)]  block lg:inline lg:ml-2">
              scope of your work
            </span>
          </h2>

          <p className="text-lg text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
            Consider the size of your project and the time it will take. This
            helps set clear expectations for participants.
          </p>
        </div>

        <div className="flex-1 space-y-8">
          {/* Project Scope */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">
              Project Scope
            </h3>
            <div className="space-y-3">
              {scopes.map((scope) => {
                const IconComponent = scope.icon;
                return (
                  <label
                    key={scope.name}
                    className={`
                      group cursor-pointer block p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedScope === scope.name
                          ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%/0.05)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] "
                          : "border-[hsl(214.3_31.8%_91.4%)]  bg-card hover:border-[hsl(160_84%_39%/0.3)]  bg-[hsl(160_84%_39%/0.05)] "
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="scope"
                        value={scope.name}
                        checked={selectedScope === scope.name}
                        onChange={(e) => setSelectedScope(e.target.value)}
                        className="sr-only"
                      />
                      <IconComponent className="w-6 h-6 mt-1 text-[hsl(160_84%_39%)] " />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[hsl(222.2_84%_4.9%)] ">
                            {scope.name}
                          </h4>
                          <span className="text-xs text-[hsl(215.4_16.3%_46.9%)]  bg-[hsl(210_40%_96.1%)]  px-2 py-1 rounded">
                            {scope.details}
                          </span>
                        </div>
                        <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">
                          {scope.description}
                        </p>
                      </div>
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${
                          selectedScope === scope.name
                            ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%)] "
                            : "border-[hsl(215.4_16.3%_46.9%/0.3)]  group-hover:border-[hsl(160_84%_39%/0.5)] "
                        }
                      `}
                      >
                        {selectedScope === scope.name && (
                          <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] "></div>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Project Duration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">
              Project Duration
            </h3>
            <div className="space-y-3">
              {durations.map((duration) => {
                const IconComponent = duration.icon;
                return (
                  <label
                    key={duration.name}
                    className={`
                      group cursor-pointer block p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedDuration === duration.name
                          ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%/0.05)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] "
                          : "border-[hsl(214.3_31.8%_91.4%)]  bg-card hover:border-[hsl(160_84%_39%/0.3)]  bg-[hsl(160_84%_39%/0.05)] "
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="duration"
                        value={duration.name}
                        checked={selectedDuration === duration.name}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="sr-only"
                      />
                      <IconComponent className="w-5 h-5 mt-1 text-[hsl(160_84%_39%)] " />
                      <div className="flex-1">
                        <h4 className="font-medium text-[hsl(222.2_84%_4.9%)]  mb-1">
                          {duration.name}
                        </h4>
                        <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">
                          {duration.description}
                        </p>
                      </div>
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${
                          selectedDuration === duration.name
                            ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%)] "
                            : "border-[hsl(215.4_16.3%_46.9%/0.3)]  group-hover:border-[hsl(160_84%_39%/0.5)] "
                        }
                      `}
                      >
                        {selectedDuration === duration.name && (
                          <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] "></div>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">
              Experience Level
            </h3>
            <div className="space-y-3">
              {experiences.map((experience) => {
                const IconComponent = experience.icon;
                return (
                  <label
                    key={experience.name}
                    className={`
                      group cursor-pointer block p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedExperience === experience.name
                          ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%/0.05)]  shadow-[0_0_40px_hsl(160_84%_50%/0.4)] "
                          : "border-[hsl(214.3_31.8%_91.4%)]  bg-card hover:border-[hsl(160_84%_39%/0.3)]  bg-[hsl(160_84%_39%/0.05)] "
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="experience"
                        value={experience.name}
                        checked={selectedExperience === experience.name}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="sr-only"
                      />
                      <IconComponent className="w-6 h-6 mt-1 text-[hsl(160_84%_39%)] " />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[hsl(222.2_84%_4.9%)] ">
                            {experience.name}
                          </h4>
                          <span className="text-xs text-[hsl(215.4_16.3%_46.9%)]  bg-[hsl(210_40%_96.1%)]  px-2 py-1 rounded">
                            {experience.details}
                          </span>
                        </div>
                        <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">
                          {experience.description}
                        </p>
                      </div>
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${
                          selectedExperience === experience.name
                            ? "border-[hsl(160_84%_39%)] bg-[hsl(160_84%_39%)] "
                            : "border-[hsl(215.4_16.3%_46.9%/0.3)]  group-hover:border-[hsl(160_84%_39%/0.5)] "
                        }
                      `}
                      >
                        {selectedExperience === experience.name && (
                          <div className="w-2 h-2 rounded-full bg-[hsl(0_0%_100%)] "></div>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;