"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Star, Bookmark, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface Job {
  id: number;
  title: string;
  description: string;
  payment: string;
  tags: string[];
  postedTime: string;
  location: string;
  clientInfo: {
    name: string;
    completedProjects: string;
    rating: number;
    memberSince: string;
    contactInfo: string;
  };
  jobLink: string;
  connects: number;
  availableConnects: number;
  experienceLevel: string;
  projectLength: string;
}

function JobDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get('jobId');
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Mock job data - in real app, fetch from API
  const mockJobs = useMemo(() => [
    {
      id: 1,
      title: "Shopify Expert to Customize Online Store",
      description: "Join our interactive AI Workshop designed exclusively for freelancers! Learn how to integrate cutting-edge AI tools into your workflow to boost productivity. Whether you&apos;re a designer, writer, developer, or marketer—this session will give you hands-on strategies to elevate your game using AI.",
      payment: "$50.00",
      tags: ["Artificial Intelligence", "Shopify", "E-commerce", "Career Counselling"],
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
      description: "We need an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication. The project involves creating a scalable solution that can handle high traffic.",
      payment: "$75.00",
      tags: ["React", "JavaScript", "E-commerce", "Payment Integration", "Node.js"],
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
  ] as Job[], []);

  useEffect(() => {
    if (jobId) {
      const foundJob = mockJobs.find(j => j.id === parseInt(jobId));
      setJob(foundJob || null);
    }
    setLoading(false);
  }, [jobId, mockJobs]);

  const handleSaveJob = () => {
    if (job) {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const isAlreadySaved = savedJobs.some((savedJob: { id: number }) => savedJob.id === job.id);
      
      if (!isAlreadySaved) {
        savedJobs.push(job);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        alert('Job saved successfully!');
      } else {
        alert('Job is already saved!');
      }
    }
  };

  const handleCopyLink = async () => {
    if (job) {
      try {
        await navigator.clipboard.writeText(job.jobLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button onClick={() => router.push('/freelancer')}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveJob}
                className="flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                Save Job
              </Button>
              <Button
                onClick={() => window.open(`/freelancer/send-proposal?jobId=${job.id}`, '_blank')}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Proposal
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Experience Level</label>
                    <p className="text-gray-900 capitalize">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Project Length</label>
                    <p className="text-gray-900 capitalize">{job.projectLength}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">{job.payment}</div>
                <p className="text-sm text-gray-600">Fixed Price</p>
              </CardContent>
            </Card>

            {/* Connects Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proposal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Connects required:</span>
                  <span className="font-medium">{job.connects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Your available:</span>
                  <span className="font-medium">{job.availableConnects}</span>
                </div>
                <div className="pt-2 border-t">
                  <Button
                    onClick={() => window.open(`/freelancer/send-proposal?jobId=${job.id}`, '_blank')}
                    className="w-full"
                    disabled={job.availableConnects < job.connects}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Proposal ({job.connects} connects)
                  </Button>
                  {job.availableConnects < job.connects && (
                    <p className="text-xs text-red-600 mt-1 text-center">
                      Not enough connects available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{job.clientInfo.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{job.clientInfo.rating}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>{job.clientInfo.completedProjects} projects completed</div>
                  <div>Member since {job.clientInfo.memberSince}</div>
                  <div>Contact: {job.clientInfo.contactInfo}</div>
                </div>
              </CardContent>
            </Card>

            {/* Project Link */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Link</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={job.jobLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-1">Link copied!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    }>
      <JobDetailContent />
    </Suspense>
  );
}
