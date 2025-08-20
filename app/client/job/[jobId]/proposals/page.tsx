"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, Clock, CheckCircle, XCircle, Eye, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion, AnimatePresence } from "framer-motion";

interface Freelancer {
  id: number;
  name: string;
  title: string;
  rating: number;
  completedJobs: number;
  skills: string[];
  location: string;
  memberSince: string;
  avatar?: string;
}

interface Proposal {
  id: number;
  freelancer: Freelancer;
  bidAmount: number;
  deliveryTime: string;
  coverLetter: string;
  attachments: string[];
  submittedAt: string;
  status: "pending" | "accepted" | "rejected";
  connects: number;
}

interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
  skills: string[];
  postedAt: string;
  proposals: Proposal[];
}

function ProposalsContent() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);


  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockJob: Job = {
      id: parseInt(jobId),
      title: "Full-Stack Web Application Development",
      description: "Looking for an experienced full-stack developer to build a modern web application using React, Node.js, and MongoDB. The project includes user authentication, payment integration, and real-time features.",
      budget: "$2,000 - $5,000",
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "Payment Integration"],
      postedAt: "2024-01-15",
      proposals: [
        {
          id: 1,
          freelancer: {
            id: 1,
            name: "Alex Johnson",
            title: "Senior Full-Stack Developer",
            rating: 4.9,
            completedJobs: 127,
            skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
            location: "San Francisco, CA",
            memberSince: "2019",
          },
          bidAmount: 3500,
          deliveryTime: "3 weeks",
          coverLetter: "Hello! I'm Alex, a senior full-stack developer with over 6 years of experience. I've built similar applications for startups and enterprises. I can deliver a high-quality, scalable solution within your timeline. My expertise includes modern React patterns, Node.js microservices, and MongoDB optimization. I'd love to discuss your project requirements in detail.",
          attachments: ["portfolio.pdf", "previous-work-samples.zip"],
          submittedAt: "2024-01-16T10:30:00Z",
          status: "pending",
          connects: 16,
        },
        {
          id: 2,
          freelancer: {
            id: 2,
            name: "Sarah Chen",
            title: "Full-Stack Developer & UI/UX Designer",
            rating: 4.8,
            completedJobs: 89,
            skills: ["React", "Node.js", "MongoDB", "Figma", "UI/UX Design"],
            location: "Toronto, Canada",
            memberSince: "2020",
          },
          bidAmount: 2800,
          deliveryTime: "4 weeks",
          coverLetter: "Hi there! I'm Sarah, a full-stack developer with a strong design background. I can not only build your application but also ensure it has an exceptional user experience. I've worked on similar projects and can provide both technical expertise and design insights. Let's create something amazing together!",
          attachments: ["design-portfolio.pdf"],
          submittedAt: "2024-01-16T14:45:00Z",
          status: "accepted",
          connects: 12,
        },
        {
          id: 3,
          freelancer: {
            id: 3,
            name: "Mike Rodriguez",
            title: "MERN Stack Specialist",
            rating: 4.7,
            completedJobs: 156,
            skills: ["React", "Node.js", "Express", "MongoDB", "Docker"],
            location: "Austin, TX",
            memberSince: "2018",
          },
          bidAmount: 4200,
          deliveryTime: "2 weeks",
          coverLetter: "Greetings! I'm Mike, a MERN stack specialist with extensive experience in building robust web applications. I can deliver your project faster than the competition while maintaining high code quality. My approach focuses on clean architecture, comprehensive testing, and deployment best practices.",
          attachments: ["technical-proposal.pdf", "timeline.pdf"],
          submittedAt: "2024-01-17T09:15:00Z",
          status: "pending",
          connects: 20,
        },
        {
          id: 4,
          freelancer: {
            id: 4,
            name: "Emma Wilson",
            title: "React & Node.js Developer",
            rating: 4.6,
            completedJobs: 73,
            skills: ["React", "Node.js", "PostgreSQL", "GraphQL", "Jest"],
            location: "London, UK",
            memberSince: "2021",
          },
          bidAmount: 2500,
          deliveryTime: "5 weeks",
          coverLetter: "Hello! I'm Emma, a passionate developer who loves creating efficient and user-friendly applications. While I may have fewer completed jobs, I make up for it with dedication, modern development practices, and competitive pricing. I'm confident I can exceed your expectations.",
          attachments: ["code-samples.zip"],
          submittedAt: "2024-01-17T16:20:00Z",
          status: "rejected",
          connects: 10,
        },
      ],
    };

    // Simulate API call
    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 500);
  }, [jobId]);

  const handleAcceptProposal = (proposalId: number) => {
    if (!job) return;
    
    const updatedProposals = job.proposals.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status: "accepted" as const }
        : proposal
    );
    
    setJob({ ...job, proposals: updatedProposals });
    alert("Proposal accepted! The freelancer has been notified.");
  };

  const handleRejectProposal = (proposalId: number) => {
    if (!job) return;
    
    const updatedProposals = job.proposals.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status: "rejected" as const }
        : proposal
    );
    
    setJob({ ...job, proposals: updatedProposals });
    alert("Proposal rejected.");
  };

  const filteredProposals = job?.proposals.filter(proposal => 
    filterStatus === "all" || proposal.status === filterStatus
  ) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposals...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Job not found</p>
          <Button onClick={() => router.push("/client/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </motion.button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Proposals for: {job.title}
          </h1>
          <p className="text-gray-600">
            {job.proposals.length} proposals received • Budget: {job.budget}
          </p>
        </motion.div>

        {/* Job Details Card */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="mb-6"
          variants={itemVariants}
        >
          <div className="flex gap-2 border-b">
            {["all", "pending", "accepted", "rejected"].map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilterStatus(status as typeof filterStatus)}
                className={`px-4 py-2 font-medium capitalize ${
                  filterStatus === status
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {status} ({job.proposals.filter(p => status === "all" || p.status === status).length})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Proposals Grid */}
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
        >
          <AnimatePresence>
            {filteredProposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                variants={itemVariants}
                layout
                whileHover={{ scale: 1.02 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{proposal.freelancer.name}</h3>
                          <p className="text-gray-600">{proposal.freelancer.title}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{proposal.freelancer.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {proposal.freelancer.completedJobs} jobs completed
                            </span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{proposal.freelancer.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={proposal.status === "accepted" ? "default" : 
                                proposal.status === "rejected" ? "destructive" : "secondary"}
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Bid Info */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Bid Amount</p>
                        <p className="text-lg font-semibold">${proposal.bidAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Time</p>
                        <p className="text-lg font-semibold">{proposal.deliveryTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Connects Used</p>
                        <p className="text-lg font-semibold">{proposal.connects}</p>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <h4 className="font-medium mb-2">Cover Letter</h4>
                      <p className="text-gray-700">{proposal.coverLetter}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {proposal.freelancer.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Attachments */}
                    {proposal.attachments.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Attachments</h4>
                        <div className="flex flex-wrap gap-2">
                          {proposal.attachments.map((attachment, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Download className="w-4 h-4" />
                              {attachment}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          onClick={() => console.log('View profile for proposal:', proposal.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </motion.div>
                      
                      {proposal.status === "pending" && (
                        <>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              onClick={() => handleAcceptProposal(proposal.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="destructive"
                              onClick={() => handleRejectProposal(proposal.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Submitted Time */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProposals.length === 0 && (
          <motion.div 
            className="text-center py-12"
            variants={itemVariants}
          >
            <p className="text-gray-500">No proposals found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProposalsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposals...</p>
        </div>
      </div>
    }>
      <ProposalsContent />
    </Suspense>
  );
}
