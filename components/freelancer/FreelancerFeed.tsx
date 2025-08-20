"use client";
import { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Filters {
  experienceLevel: string;
  projectLength: string;
}

const Sidebar = React.memo(function Sidebar({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  selectedCategory,
  setSelectedCategory,
  filters,
  setFilters,
  setIsSidebarOpen,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setCurrentPage: (val: number) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  filters: Filters;
  setFilters: (val: Filters) => void;
  setIsSidebarOpen: (val: boolean) => void;
}) {
  // You may need to move categories definition outside or pass as prop
  const categories = [
    "All",
    "Development & IT",
    "Design & Creative",
    "Sales & Marketing",
    "Writing & Translation",
    "Admin & Customer Support",
    "Data Science",
    "Mobile Development",
    "DevOps & Cloud",
  ];

  return (
    <div className="bg-[hsl(0_0%_100%)] h-full p-4 lg:p-6 border-r border-[hsl(214.3_31.8%_91.4%)] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-[hsl(222.2_84%_4.9%)] text-lg font-semibold">
          Find Jobs
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <h2 className="text-[hsl(222.2_84%_4.9%)] text-lg font-semibold mb-6 hidden lg:block">
        Find Jobs
      </h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-[hsl(215.4_16.3%_46.9%)] w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for jobs"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-[hsl(215.4_16.3%_46.9%)]" size={16} />
          <span className="font-medium text-[hsl(222.2_84%_4.9%)]">
            Filters
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
              Experience Level
            </label>
            <Select
              value={filters.experienceLevel}
              onValueChange={(value) => {
                setFilters({ ...filters, experienceLevel: value });
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any level</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
              Project Length
            </label>
            <Select
              value={filters.projectLength}
              onValueChange={(value) => {
                setFilters({ ...filters, projectLength: value });
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any duration</SelectItem>
                <SelectItem value="short">Less than 1 month</SelectItem>
                <SelectItem value="medium">1-3 months</SelectItem>
                <SelectItem value="long">3-6 months</SelectItem>
                <SelectItem value="ongoing">More than 6 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2 mb-8">
        <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] mb-3">
          Categories
        </h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
              setIsSidebarOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedCategory === category
                ? "bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] font-medium"
                : "text-[hsl(215.4_16.3%_46.9%)] hover:text-[hsl(222.2_84%_4.9%)] hover:bg-[hsl(210_40%_96.1%/0.5)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Saved Jobs */}
      <div className="mb-8">
        <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] mb-4">
          Saved Jobs
        </h3>
        <div className="space-y-4">
          <div className="text-[hsl(215.4_16.3%_46.9%)] text-sm">
            <div className="text-[hsl(215.4_16.3%_46.9%)] text-xs mb-1">
              Saved Yesterday
            </div>
            <div className="text-[hsl(222.2_84%_4.9%)] font-medium">
              AI Workshop: Supercharge Your Income
            </div>
            <div className="text-xs text-[hsl(215.4_16.3%_46.9%)] mt-2">
              Join our interactive AI Workshop...
            </div>
            <div className="bg-[hsl(210_40%_96.1%)] inline-block px-2 py-1 rounded text-xs mt-2 text-[hsl(222.2_47.4%_11.2%)]">
              Artificial Intelligence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const FreelancerFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    experienceLevel: "",
    projectLength: "",
  });

  const jobsPerPage = 6;



  const jobs = [
    {
      id: 1,
      title: "Shopify Expert to Customize Online Store",
      description:
        "Join our interactive AI Workshop designed exclusively for freelancers! Learn how to integrate cutting-edge AI tools into your workflow to boost productivity. Whether you're a designer, writer, developer, or marketer—this session will give you hands-on strategies to elevate your game using AI.",
      payment: "$50.00",
      tags: [
        "Artificial Intelligence",
        "Shopify",
        "E-commerce",
        "Career Counselling",
      ],
      postedTime: "Posted Yesterday",
      location: "Canada",
      clientInfo: {
        name: "TechCorp Solutions",
        completedProjects: "100+",
        rating: 4.8,
        memberSince: "Jul 10, 2021",
        contactInfo: "0000000000",
      },
      jobLink: "https://www.techcorp.example.com/project",
      connects: 10,
      availableConnects: 120,
      experienceLevel: "intermediate",
      projectLength: "short",
    },
    {
      id: 2,
      title: "React Developer for E-commerce Platform",
      description:
        "We need an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication. The project involves creating a scalable solution that can handle high traffic.",
      payment: "$75.00",
      tags: [
        "React",
        "JavaScript",
        "E-commerce",
        "Payment Integration",
        "Node.js",
      ],
      postedTime: "Posted 2 days ago",
      location: "United States",
      clientInfo: {
        name: "Digital Commerce Inc",
        completedProjects: "50+",
        rating: 4.9,
        memberSince: "Jan 15, 2020",
        contactInfo: "1234567890",
      },
      jobLink: "https://www.digitalcommerce.example.com/project",
      connects: 8,
      availableConnects: 120,
      experienceLevel: "expert",
      projectLength: "medium",
    },
    {
      id: 3,
      title: "UI/UX Designer for Mobile App",
      description:
        "Looking for a talented UI/UX designer to create intuitive and visually appealing designs for our mobile application. Experience with Figma and mobile design principles required. Must understand user psychology and accessibility standards.",
      payment: "$60.00",
      tags: [
        "UI/UX Design",
        "Mobile Design",
        "Figma",
        "Prototyping",
        "User Research",
      ],
      postedTime: "Posted 3 days ago",
      location: "United Kingdom",
      clientInfo: {
        name: "AppDesign Studio",
        completedProjects: "80+",
        rating: 4.7,
        memberSince: "Mar 22, 2019",
        contactInfo: "9876543210",
      },
      jobLink: "https://www.appdesign.example.com/project",
      connects: 12,
      availableConnects: 120,
      experienceLevel: "intermediate",
      projectLength: "medium",
    },
    {
      id: 4,
      title: "Content Writer for Tech Blog",
      description:
        "We're seeking a skilled content writer to create engaging blog posts about technology trends, software reviews, and industry insights. Strong research skills and SEO knowledge preferred. Must be able to write for technical and non-technical audiences.",
      payment: "$40.00",
      tags: [
        "Content Writing",
        "SEO",
        "Technology",
        "Blog Writing",
        "Research",
      ],
      postedTime: "Posted 4 days ago",
      location: "Australia",
      clientInfo: {
        name: "TechBlog Media",
        completedProjects: "200+",
        rating: 4.6,
        memberSince: "Sep 05, 2018",
        contactInfo: "5555555555",
      },
      jobLink: "https://www.techblog.example.com/project",
      connects: 6,
      availableConnects: 120,
      experienceLevel: "entry",
      projectLength: "long",
    },
    {
      id: 5,
      title: "Python Developer for Data Analysis",
      description:
        "Join our team as a Python developer to work on data analysis projects. Experience with pandas, numpy, and data visualization libraries required. You'll be working on machine learning models and statistical analysis for business intelligence.",
      payment: "$80.00",
      tags: ["Python", "Data Analysis", "Pandas", "Machine Learning", "NumPy"],
      postedTime: "Posted 5 days ago",
      location: "Germany",
      clientInfo: {
        name: "DataScience Solutions",
        completedProjects: "75+",
        rating: 4.8,
        memberSince: "Nov 12, 2020",
        contactInfo: "7777777777",
      },
      jobLink: "https://www.datascience.example.com/project",
      connects: 15,
      availableConnects: 120,
      experienceLevel: "expert",
      projectLength: "long",
    },
    {
      id: 6,
      title: "Social Media Marketing Specialist",
      description:
        "We need a social media marketing specialist to manage our brand's online presence across multiple platforms and create engaging content strategies. Experience with paid advertising and analytics tools required.",
      payment: "$45.00",
      tags: [
        "Social Media",
        "Marketing",
        "Content Strategy",
        "Brand Management",
        "Analytics",
      ],
      postedTime: "Posted 1 week ago",
      location: "India",
      clientInfo: {
        name: "Marketing Pro Agency",
        completedProjects: "150+",
        rating: 4.5,
        memberSince: "Feb 28, 2021",
        contactInfo: "8888888888",
      },
      jobLink: "https://www.marketingpro.example.com/project",
      connects: 9,
      availableConnects: 120,
      experienceLevel: "intermediate",
      projectLength: "medium",
    },
    {
      id: 7,
      title: "Flutter Mobile App Developer",
      description:
        "Seeking an experienced Flutter developer to build cross-platform mobile applications. Must have experience with state management, API integration, and publishing to app stores. Previous experience with Firebase is a plus.",
      payment: "$90.00",
      tags: [
        "Flutter",
        "Mobile Development",
        "Dart",
        "Firebase",
        "Cross-platform",
      ],
      postedTime: "Posted 2 days ago",
      location: "Singapore",
      clientInfo: {
        name: "MobileFirst Solutions",
        completedProjects: "60+",
        rating: 4.9,
        memberSince: "Jun 15, 2019",
        contactInfo: "1111111111",
      },
      jobLink: "https://www.mobilefirst.example.com/project",
      connects: 12,
      availableConnects: 120,
      experienceLevel: "expert",
      projectLength: "long",
    },
    {
      id: 8,
      title: "DevOps Engineer for Cloud Infrastructure",
      description:
        "Looking for a DevOps engineer to help set up and maintain cloud infrastructure using AWS/Azure. Experience with Docker, Kubernetes, and CI/CD pipelines required. Must be able to work with development teams.",
      payment: "$100.00",
      tags: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
      postedTime: "Posted 3 days ago",
      location: "Netherlands",
      clientInfo: {
        name: "CloudTech Systems",
        completedProjects: "40+",
        rating: 4.8,
        memberSince: "Aug 10, 2020",
        contactInfo: "2222222222",
      },
      jobLink: "https://www.cloudtech.example.com/project",
      connects: 18,
      availableConnects: 120,
      experienceLevel: "expert",
      projectLength: "ongoing",
    },
  ];

  interface ClientInfo {
    name: string;
    completedProjects: string;
    rating: number;
    memberSince: string;
    contactInfo: string;
  }

  interface Job {
    id: number;
    title: string;
    description: string;
    payment: string;
    tags: string[];
    postedTime: string;
    location: string;
    clientInfo: ClientInfo;
    jobLink: string;
    connects: number;
    availableConnects: number;
    experienceLevel: string;
    projectLength: string;
  }

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailOpen(true);
  };

  const handleSendProposal = () => {
    if (selectedJob) {
      window.open(`/freelancer/send-proposal?jobId=${selectedJob.id}`, '_blank');
    }
    setIsJobDetailOpen(false);
  };

  const handleSaveJob = () => {
    if (selectedJob) {
      // In a real app, this would save to backend
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const isAlreadySaved = savedJobs.some((job: { id: number }) => job.id === selectedJob.id);
      
      if (!isAlreadySaved) {
        savedJobs.push(selectedJob);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        alert('Job saved successfully!');
      } else {
        alert('Job is already saved!');
      }
    }
    setIsJobDetailOpen(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" ||
      job.tags.some((tag) => {
        if (selectedCategory === "Development & IT")
          return [
            "React",
            "JavaScript",
            "Python",
            "Shopify",
            "Vue.js",
            "Node.js",
          ].includes(tag);
        if (selectedCategory === "Design & Creative")
          return [
            "UI/UX Design",
            "Figma",
            "Graphic Design",
            "Brand Identity",
            "Adobe Creative Suite",
          ].includes(tag);
        if (selectedCategory === "Sales & Marketing")
          return [
            "Marketing",
            "Social Media",
            "Content Strategy",
            "Brand Management",
          ].includes(tag);
        if (selectedCategory === "Writing & Translation")
          return [
            "Content Writing",
            "Blog Writing",
            "Technical Writing",
            "API Documentation",
          ].includes(tag);
        if (selectedCategory === "Data Science")
          return [
            "Data Analysis",
            "Machine Learning",
            "Python",
            "TensorFlow",
            "PyTorch",
          ].includes(tag);
        if (selectedCategory === "Mobile Development")
          return [
            "Flutter",
            "Mobile Development",
            "Mobile Design",
            "Unity 3D",
            "Mobile Games",
          ].includes(tag);
        if (selectedCategory === "DevOps & Cloud")
          return ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"].includes(
            tag
          );
        return false;
      });

    const matchesExperienceLevel =
      filters.experienceLevel === "any" ||
      !filters.experienceLevel ||
      job.experienceLevel === filters.experienceLevel;

    const matchesProjectLength =
      filters.projectLength === "any" ||
      !filters.projectLength ||
      job.projectLength === filters.projectLength;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesExperienceLevel &&
      matchesProjectLength
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_100%)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[hsl(214.3_31.8%_91.4%)]">
          <h1 className="text-xl font-bold text-[hsl(222.2_84%_4.9%)]">
            Job Feed
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <Sidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filters={filters}
              setFilters={setFilters}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen">
          <Sidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filters={filters}
            setFilters={setFilters}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Results Header */}
          <div className="mb-6 hidden lg:block">
            <h1 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] mb-2">
              Job Feed
            </h1>
            <p className="text-[hsl(215.4_16.3%_46.9%)]">
              {filteredJobs.length} jobs found • Page {currentPage} of{" "}
              {totalPages}
            </p>
          </div>

          {/* Mobile Results Summary */}
          <div className="mb-4 lg:hidden">
            <p className="text-[hsl(215.4_16.3%_46.9%)] text-sm">
              {filteredJobs.length} jobs • Page {currentPage}/{totalPages}
            </p>
          </div>

          {/* Jobs Grid */}
          <motion.div 
            className="space-y-4 lg:space-y-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {currentJobs.map((job) => (
              <Sheet
                key={job.id}
                open={isJobDetailOpen && selectedJob?.id === job.id}
                onOpenChange={setIsJobDetailOpen}
              >
                <SheetTrigger asChild>
                  <motion.div
                    onClick={() => handleJobClick(job)}
                    className="bg-[hsl(0_0%_100%)] rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[hsl(214.3_31.8%_91.4%)]"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut"
                        }
                      }
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <span className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
                        {job.postedTime}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
                              const isAlreadySaved = savedJobs.some((savedJob: { id: number }) => savedJob.id === job.id);
                              
                              if (!isAlreadySaved) {
                                savedJobs.push(job);
                                localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
                                alert('Job saved successfully!');
                              } else {
                                alert('Job is already saved!');
                              }
                            }}
                          >
                            <Bookmark className="text-[hsl(215.4_16.3%_46.9%)] hover:text-[hsl(222.2_84%_4.9%)] w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                          >
                            <Heart className="text-[hsl(215.4_16.3%_46.9%)] hover:text-red-500 w-4 h-4" />
                          </Button>
                        </motion.div>
                        <span className="text-sm text-[hsl(215.4_16.3%_46.9%)] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg lg:text-xl font-semibold text-[hsl(222.2_84%_4.9%)] mb-3 hover:text-[hsl(160_84%_39%)] line-clamp-2">
                      {job.title}
                    </h3>

                    <p className="text-[hsl(215.4_16.3%_46.9%)] text-sm mb-4 leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    <div className="mb-4">
                      <div className="text-[hsl(222.2_84%_4.9%)] text-sm font-medium">
                        Fixed Price
                      </div>
                      <div className="text-xl font-bold text-[hsl(222.2_84%_4.9%)]">
                        {job.payment}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] px-3 py-1 rounded-full text-sm hover:bg-[hsl(210_40%_96.1%)/0.8] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && (
                        <span className="text-[hsl(215.4_16.3%_46.9%)] text-sm px-3 py-1">
                          +{job.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                </SheetTrigger>

                {/* Job Detail Side Panel */}
                <SheetContent
                  side="right"
                  className="w-full sm:w-[600px] overflow-y-auto"
                >
                  {selectedJob && (
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] mb-2">
                          {selectedJob.postedTime}
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold text-[hsl(222.2_84%_4.9%)] mb-4">
                          {selectedJob.title}
                        </h2>

                        <div className="bg-[hsl(210_40%_96.1%)] p-4 rounded-lg mb-6">
                          <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] mb-2">
                            Project Payment
                          </div>
                          <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)]">
                            {selectedJob.payment}
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={handleSendProposal}
                              className="w-full"
                            >
                              Send Proposal
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button variant="outline" className="w-full" onClick={handleSaveJob}>
                              <Bookmark className="w-4 h-4 mr-2" />
                              Save Job
                            </Button>
                          </motion.div>
                        </div>

                        <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] mb-6">
                          <div>
                            Connects to submit a proposal:{" "}
                            <span className="font-semibold text-[hsl(222.2_84%_4.9%)]">
                              {selectedJob.connects}
                            </span>
                          </div>
                          <div>
                            Available Connects:{" "}
                            <span className="font-semibold text-[hsl(222.2_84%_4.9%)]">
                              {selectedJob.availableConnects}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] mb-3">
                          Job Description
                        </h3>
                        <p className="text-[hsl(222.2_84%_4.9%)] leading-relaxed mb-4">
                          {selectedJob.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedJob.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] px-3 py-1 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] mb-3">
                          About the Client
                        </h3>
                        <div className="space-y-2 text-sm text-[hsl(222.2_84%_4.9%)]">
                          <div>
                            Company:{" "}
                            <span className="font-semibold">
                              {selectedJob.clientInfo.name}
                            </span>
                          </div>
                          <div>
                            Executed{" "}
                            <span className="font-semibold">
                              {selectedJob.clientInfo.completedProjects}
                            </span>{" "}
                            projects
                          </div>
                          <div>
                            Rating:{" "}
                            <span className="font-semibold">
                              {selectedJob.clientInfo.rating}/5.0
                            </span>
                          </div>
                          <div>
                            Contact:{" "}
                            <span className="font-semibold">
                              {selectedJob.clientInfo.contactInfo}
                            </span>
                          </div>
                          <div>
                            Member since{" "}
                            <span className="font-semibold">
                              {selectedJob.clientInfo.memberSince}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] mb-3">
                          Project Link
                        </h3>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <Input
                            type="text"
                            value={selectedJob.jobLink}
                            readOnly
                            className="flex-1 bg-[hsl(0_0%_98%)]"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-auto"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              </motion.div>

              <div className="flex gap-1 overflow-x-auto">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  if (totalPages <= 5) {
                    return page;
                  }

                  if (currentPage <= 3) {
                    return page;
                  }

                  if (currentPage >= totalPages - 2) {
                    return totalPages - 4 + i;
                  }

                  return currentPage - 2 + i;
                }).map((page) => (
                  <motion.div
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-auto"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerFeed;
