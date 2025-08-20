"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, DollarSign, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

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

function SendProposalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const jobId = searchParams.get('jobId');
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [proposalData, setProposalData] = useState({
    bidAmount: '',
    deliveryTime: '',
    coverLetter: '',
    attachments: [] as File[],
  });

  // Mock job data - in real app, fetch from API
  const mockJobs = useMemo(() => [
    {
      id: 1,
      title: "Shopify Expert to Customize Online Store",
      description: "Join our interactive AI Workshop designed exclusively for freelancers! Learn how to integrate cutting-edge AI tools into your workflow to boost productivity. Whether you're a designer, writer, developer, or marketer—this session will give you hands-on strategies to elevate your game using AI.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user) return;

    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, send proposal to backend
      console.log('Proposal submitted:', {
        jobId: job.id,
        freelancerId: user.id,
        ...proposalData
      });
      
      // Redirect to success page or dashboard
      router.push('/freelancer/dashboard?proposal=success');
    } catch (error) {
      console.error('Error submitting proposal:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProposalData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setProposalData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
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
            Back to Job
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Send Proposal</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{job.payment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.postedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">About the Client</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{job.clientInfo.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{job.clientInfo.rating}</span>
                      </div>
                    </div>
                    <div>{job.clientInfo.completedProjects} projects completed</div>
                    <div>Member since {job.clientInfo.memberSince}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600">
                    <div>Connects required: <span className="font-medium">{job.connects}</span></div>
                    <div>Your available connects: <span className="font-medium">{job.availableConnects}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposal Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bid Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Bid (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <Input
                        type="number"
                        value={proposalData.bidAmount}
                        onChange={(e) => setProposalData(prev => ({ ...prev, bidAmount: e.target.value }))}
                        placeholder="0.00"
                        className="pl-8"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Client&apos;s budget: {job.payment}
                    </p>
                  </div>

                  {/* Delivery Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time
                    </label>
                    <select
                      value={proposalData.deliveryTime}
                      onChange={(e) => setProposalData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select delivery time</option>
                      <option value="1-3 days">1-3 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2-3 months">2-3 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <Textarea
                      value={proposalData.coverLetter}
                      onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder="Introduce yourself and explain why you're the best fit for this job..."
                      rows={8}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {proposalData.coverLetter.length}/5000 characters
                    </p>
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-2">
                      Max 5 files, 10MB each. Supported: PDF, DOC, DOCX, JPG, PNG
                    </p>
                    
                    {proposalData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {proposalData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="border-t pt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Proposal...
                        </>
                      ) : (
                        `Submit Proposal (${job.connects} connects)`
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      By submitting this proposal, you agree to our terms of service
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SendProposalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal form...</p>
        </div>
      </div>
    }>
      <SendProposalContent />
    </Suspense>
  );
}
