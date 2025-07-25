"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = React.memo(function Sidebar({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  filters,
  setFilters,
  selectedTab,
  setSelectedTab,
  setIsSidebarOpen,
  router,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setCurrentPage: (val: number) => void;
  filters: { status: string; category: string; datePosted: string };
  setFilters: (val: any) => void;
  selectedTab: string;
  setSelectedTab: (val: string) => void;
  setIsSidebarOpen: (val: boolean) => void;
  router: any;
}) {
  return (
    <div className="bg-[hsl(0_0%_100%)] h-full p-4 lg:p-6 border-r border-[hsl(214.3_31.8%_91.4%)] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-[hsl(222.2_84%_4.9%)] text-lg font-semibold">
          Job Management
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
        Job Management
      </h2>

      {/* Post a Job Button */}
      <div className="mb-6">
        <Button
          onClick={() => router.push("/client")}
          className="w-full mb-3 bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post a Job
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-[hsl(215.4_16.3%_46.9%)] w-4 h-4" />
        <Input
          type="text"
          placeholder="Search your jobs"
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
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
              Status
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) => {
                setFilters({ ...filters, status: value });
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
              Category
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => {
                setFilters({ ...filters, category: value });
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">All categories</SelectItem>
                <SelectItem value="Development & IT">
                  Development & IT
                </SelectItem>
                <SelectItem value="Design & Creative">
                  Design & Creative
                </SelectItem>
                <SelectItem value="Writing & Translation">
                  Writing & Translation
                </SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-2 mb-8">
        <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] mb-3">
          Dashboard
        </h3>
        {["posted", "proposals", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedTab === tab
                ? "bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] font-medium"
                : "text-[hsl(215.4_16.3%_46.9%)] hover:text-[hsl(222.2_84%_4.9%)] hover:bg-[hsl(210_40%_96.1%/0.5)]"
            }`}
          >
            {tab === "posted" && <Briefcase className="w-4 h-4" />}
            {tab === "proposals" && <FileText className="w-4 h-4" />}
            {tab === "analytics" && <BarChart3 className="w-4 h-4" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Jobs
          </button>
        ))}
      </div>
    </div>
  );
});

const ClientFeed = () => {
  const [selectedTab, setSelectedTab] = useState("posted");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "any", // Not ""
    category: "any", // Not ""
    datePosted: "", // If used
  });

  const jobsPerPage = 6;

  interface Proposal {
    id: number;
    freelancerName: string;
    freelancerRating: number;
    freelancerLocation: string;
    coverLetter: string;
    bidAmount: string;
    deliveryTime: string;
    proposalDate: string;
    freelancerAvatar: string;
    freelancerCompletedJobs: number;
    freelancerSuccessRate: number;
    portfolioItems: number;
  }

  interface Job {
    id: number;
    title: string;
    description: string;
    budget: string;
    budgetType: "fixed" | "hourly";
    category: string;
    skills: string[];
    postedDate: string;
    status: "active" | "paused" | "closed" | "draft";
    proposals: Proposal[];
    experienceLevel: string;
    projectLength: string;
    location: string;
    visibility: "public" | "private";
  }

  const postedJobs: Job[] = [
    {
      id: 1,
      title: "React Developer for E-commerce Platform",
      description:
        "We need an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication.",
      budget: "$75.00/hr",
      budgetType: "hourly",
      category: "Development & IT",
      skills: [
        "React",
        "JavaScript",
        "Node.js",
        "E-commerce",
        "Payment Integration",
      ],
      postedDate: "2024-01-15",
      status: "active",
      experienceLevel: "expert",
      projectLength: "medium",
      location: "Worldwide",
      visibility: "public",
      proposals: [
        {
          id: 1,
          freelancerName: "Alex Johnson",
          freelancerRating: 4.9,
          freelancerLocation: "United States",
          coverLetter:
            "I have over 5 years of experience in React development and have built multiple e-commerce platforms. I can deliver high-quality code with proper testing and documentation.",
          bidAmount: "$70.00/hr",
          deliveryTime: "2 weeks",
          proposalDate: "2024-01-16",
          freelancerAvatar: "AJ",
          freelancerCompletedJobs: 127,
          freelancerSuccessRate: 98,
          portfolioItems: 15,
        },
        {
          id: 2,
          freelancerName: "Sarah Chen",
          freelancerRating: 4.8,
          freelancerLocation: "Canada",
          coverLetter:
            "Hello! I'm a full-stack developer specializing in React and Node.js. I've built several successful e-commerce platforms and can provide references from previous clients.",
          bidAmount: "$65.00/hr",
          deliveryTime: "3 weeks",
          proposalDate: "2024-01-17",
          freelancerAvatar: "SC",
          freelancerCompletedJobs: 89,
          freelancerSuccessRate: 96,
          portfolioItems: 12,
        },
      ],
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile App",
      description:
        "Looking for a talented UI/UX designer to create intuitive and visually appealing designs for our mobile application. Experience with Figma and mobile design principles required.",
      budget: "$3,500",
      budgetType: "fixed",
      category: "Design & Creative",
      skills: [
        "UI/UX Design",
        "Figma",
        "Mobile Design",
        "Prototyping",
        "User Research",
      ],
      postedDate: "2024-01-10",
      status: "active",
      experienceLevel: "intermediate",
      projectLength: "short",
      location: "Worldwide",
      visibility: "public",
      proposals: [
        {
          id: 3,
          freelancerName: "Maria Rodriguez",
          freelancerRating: 4.9,
          freelancerLocation: "Spain",
          coverLetter:
            "I'm a UX/UI designer with 6+ years of experience in mobile app design. I focus on creating user-centered designs that are both beautiful and functional.",
          bidAmount: "$3,200",
          deliveryTime: "2 weeks",
          proposalDate: "2024-01-11",
          freelancerAvatar: "MR",
          freelancerCompletedJobs: 156,
          freelancerSuccessRate: 99,
          portfolioItems: 28,
        },
      ],
    },
    {
      id: 3,
      title: "Content Writer for Tech Blog",
      description:
        "We're seeking a skilled content writer to create engaging blog posts about technology trends, software reviews, and industry insights.",
      budget: "$25.00/hr",
      budgetType: "hourly",
      category: "Writing & Translation",
      skills: [
        "Content Writing",
        "SEO",
        "Technology",
        "Blog Writing",
        "Research",
      ],
      postedDate: "2024-01-08",
      status: "paused",
      experienceLevel: "intermediate",
      projectLength: "long",
      location: "English Native",
      visibility: "public",
      proposals: [
        {
          id: 4,
          freelancerName: "David Kim",
          freelancerRating: 4.7,
          freelancerLocation: "Australia",
          coverLetter:
            "I'm a technical writer with extensive experience in the tech industry. I can create engaging content that resonates with both technical and non-technical audiences.",
          bidAmount: "$22.00/hr",
          deliveryTime: "Ongoing",
          proposalDate: "2024-01-09",
          freelancerAvatar: "DK",
          freelancerCompletedJobs: 78,
          freelancerSuccessRate: 94,
          portfolioItems: 22,
        },
      ],
    },
    {
      id: 4,
      title: "Python Developer for Data Analysis",
      description:
        "Join our team as a Python developer to work on data analysis projects. Experience with pandas, numpy, and data visualization libraries required.",
      budget: "$4,800",
      budgetType: "fixed",
      category: "Data Science",
      skills: [
        "Python",
        "Data Analysis",
        "Pandas",
        "Machine Learning",
        "NumPy",
      ],
      postedDate: "2024-01-05",
      status: "closed",
      experienceLevel: "expert",
      projectLength: "medium",
      location: "Worldwide",
      visibility: "public",
      proposals: [
        {
          id: 5,
          freelancerName: "Jennifer Walsh",
          freelancerRating: 4.8,
          freelancerLocation: "United Kingdom",
          coverLetter:
            "I'm a data scientist with 4+ years of experience in Python development. I specialize in data analysis, machine learning, and statistical modeling.",
          bidAmount: "$4,500",
          deliveryTime: "4 weeks",
          proposalDate: "2024-01-06",
          freelancerAvatar: "JW",
          freelancerCompletedJobs: 94,
          freelancerSuccessRate: 97,
          portfolioItems: 18,
        },
      ],
    },
  ];

  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "paused":
        return "Paused";
      case "closed":
        return "Closed";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailOpen(true);
  };

  const filteredJobs = postedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      filters.status === "any" || job.status === filters.status;

    const matchesCategory =
      filters.category === "any" || job.category === filters.category;

    return matchesSearch && matchesStatus && matchesCategory;
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
            Job Management
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsPostJobOpen(true)}
              size="sm"
              className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <Sidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              filters={filters}
              setFilters={setFilters}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setIsSidebarOpen={setIsSidebarOpen}
              router={router}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen">
          <Sidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            filters={filters}
            setFilters={setFilters}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setIsSidebarOpen={setIsSidebarOpen}
            router={router}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Results Header */}
         
          <div className="mb-6 hidden lg:block">
            <h1 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] mb-2">
              My Posted Jobs
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
          <div className="space-y-4 lg:space-y-6 mb-8">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[hsl(0_0%_100%)] rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow border border-[hsl(214.3_31.8%_91.4%)]"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusText(job.status)}
                    </Badge>
                    <span className="text-sm text-[hsl(215.4_16.3%_46.9%)] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Posted {job.postedDate}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto self-start sm:self-center"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Job Settings
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3
                  className="text-lg lg:text-xl font-semibold text-[hsl(222.2_84%_4.9%)] mb-3 hover:text-[hsl(160_84%_39%)] cursor-pointer line-clamp-2"
                  onClick={() => handleJobClick(job)}
                >
                  {job.title}
                </h3>

                <p className="text-[hsl(215.4_16.3%_46.9%)] text-sm mb-4 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div>
                      <div className="text-[hsl(222.2_84%_4.9%)] text-sm font-medium">
                        {job.budgetType === "fixed"
                          ? "Fixed Price"
                          : "Hourly Rate"}
                      </div>
                      <div className="text-lg font-bold text-[hsl(222.2_84%_4.9%)]">
                        {job.budget}
                      </div>
                    </div>
                    <div>
                      <div className="text-[hsl(215.4_16.3%_46.9%)] text-sm">
                        Proposals
                      </div>
                      <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]">
                        {job.proposals.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJobClick(job)}
                      className="w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Proposals
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-[hsl(215.4_16.3%_46.9%)] text-sm px-3 py-1">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

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
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Job Detail with Proposals Sheet */}
      <Sheet open={isJobDetailOpen} onOpenChange={setIsJobDetailOpen}>
        <SheetContent
          side="right"
          className="w-[90%] sm:w-[800px] lg:w-[720px] overflow-y-auto"
        >
          {selectedJob && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={getStatusColor(selectedJob.status)}>
                    {getStatusText(selectedJob.status)}
                  </Badge>
                  <span className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
                    Posted {selectedJob.postedDate}
                  </span>
                </div>

                <h2 className="text-xl lg:text-2xl font-bold text-[hsl(222.2_84%_4.9%)] mb-4">
                  {selectedJob.title}
                </h2>

                <div className="bg-[hsl(210_40%_96.1%)] p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
                        Budget
                      </div>
                      <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]">
                        {selectedJob.budget}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
                        Proposals
                      </div>
                      <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]">
                        {selectedJob.proposals.length}
                      </div>
                    </div>
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
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_47.4%_11.2%)] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] mb-4">
                  Proposals ({selectedJob.proposals.length})
                </h3>

                {selectedJob.proposals.length === 0 ? (
                  <div className="text-center py-8 text-[hsl(215.4_16.3%_46.9%)]">
                    No proposals received yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedJob.proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="border border-[hsl(214.3_31.8%_91.4%)] rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        {/* Top Section: Avatar & Bid Info */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-4">
                          {/* Avatar + Name/Location */}
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 bg-[hsl(160_84%_39%)] text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                              {proposal.freelancerAvatar}
                            </div>
                            <div>
                              <div className="font-semibold text-[hsl(222.2_84%_4.9%)]">
                                {proposal.freelancerName}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-[hsl(215.4_16.3%_46.9%)]">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{proposal.freelancerRating}</span>
                                <span>•</span>
                                <span>{proposal.freelancerLocation}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bid Info */}
                          <div className="text-left sm:text-right mt-2 sm:mt-0">
                            <div className="font-semibold text-[hsl(222.2_84%_4.9%)]">
                              {proposal.bidAmount}
                            </div>
                            <div className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
                              in {proposal.deliveryTime}
                            </div>
                          </div>
                        </div>

                        {/* Cover Letter */}
                        <p className="text-[hsl(222.2_84%_4.9%)] text-sm mb-4 leading-relaxed">
                          {proposal.coverLetter}
                        </p>

                        {/* Footer: Metrics + Buttons */}
                        <div className="flex flex-col sm:items-center sm:justify-between gap-4">
                          <div className="flex flex-wrap gap-2 text-xs text-[hsl(215.4_16.3%_46.9%)]">
                            <span>
                              {proposal.freelancerCompletedJobs} jobs completed
                            </span>
                            <span>
                              {proposal.freelancerSuccessRate}% success rate
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => router.push("/freelancer/profile")}
                            >
                              View Profile
                            </Button>
                            <Button
                              size="sm"
                              className="w-full bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
                            >
                              Hire
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      {/* Post Job Sheet */}
      <Sheet open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
        <SheetContent
          side="right"
          className="w-[90%] sm:w-[900px] lg:w-[720px] overflow-y-auto"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-[hsl(222.2_84%_4.9%)] mb-2">
                Post a New Job
              </h2>
              <p className="text-[hsl(215.4_16.3%_46.9%)]">
                Tell us what you need done and receive proposals from
                freelancers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Job Title
                </label>
                <Input
                  placeholder="e.g. Build a responsive website"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Job Description
                </label>
                <Textarea
                  placeholder="Describe your project in detail..."
                  className="w-full min-h-[120px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Category
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">
                      Development & IT
                    </SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="writing">
                      Writing & Translation
                    </SelectItem>
                    <SelectItem value="marketing">Sales & Marketing</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Budget Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Skills Required
                </label>
                <Input
                  placeholder="e.g. React, JavaScript, UI Design (separate with commas)"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(222.2_84%_4.9%)] mb-2">
                  Experience Level
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsPostJobOpen(false)}
                >
                  Save as Draft
                </Button>
                <Button
                  className="flex-1 bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
                  onClick={() => setIsPostJobOpen(false)}
                >
                  Post Job
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientFeed;
