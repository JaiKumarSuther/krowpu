"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FaArrowLeft, FaUpload, FaPaperclip } from "react-icons/fa";

// TEMPORARY MOCK - replace with actual job fetching or context
const mockJob = {
  title: "Mobile App UI Fixes",
  description: "Need a dev to fix layout bugs in Flutter app",
  tags: ["Flutter", "UI", "Mobile"],
  connects: 10,
  availableConnects: 50,
  clientInfo: {
    name: "Tech Studio",
    completedProjects: 34,
    memberSince: "Jan 2021",
  },
  location: "Remote",
  payment: "$300",
};

const ApplyPage = () => {
  const router = useRouter();

  // You can fetch job via query param or prefetch in parent
  const job = mockJob; // Replace this with real job fetching logic
  const [connects] = useState(job?.connects || 10);

  const [proposal, setProposal] = useState({
    coverLetter: "",
    hourlyRate: "",
    totalAmount: "",
    duration: "",
    attachments: [],
  });

  if (!job) {
    return (
      <div className="min-h-screen text-black bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No job selected
          </h2>
          <Button onClick={() => router.push("/")}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const handleSubmitProposal = () => {
    console.log("Submitting proposal:", proposal);
    router.push("/");
  };

  return (
    <div className="min-h-screen text-black bg-gray-50">
      <div className="">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <FaArrowLeft />
              Back to Jobs
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Submit a Proposal
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Job Details
              </h2>
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Cover Letter
              </h2>
              <Textarea
                placeholder="Introduce yourself..."
                value={proposal.coverLetter}
                onChange={(e) =>
                  setProposal({ ...proposal, coverLetter: e.target.value })
                }
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 100 characters
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Terms
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                      $
                    </span>
                    <Input
                      type="number"
                      value={proposal.hourlyRate}
                      onChange={(e) =>
                        setProposal({ ...proposal, hourlyRate: e.target.value })
                      }
                      className="pl-8"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Total amount the client will see: $
                    {proposal.hourlyRate || "0.00"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <Select
                    value={proposal.duration}
                    onValueChange={(value) =>
                      setProposal({ ...proposal, duration: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1-month">
                        Less than 1 month
                      </SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="more-than-6-months">
                        More than 6 months
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Attachments
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop files here or
                </p>
                <Button variant="outline" size="sm">
                  <FaPaperclip className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Max file size: 25MB
                </p>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Connects</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Connects to submit</span>
                  <span className="font-semibold">{connects}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available connects</span>
                  <span className="font-semibold">{job.availableConnects}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining after submission</span>
                  <span className="font-semibold">
                    {job.availableConnects - connects}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                About the Client
              </h3>
              <div className="space-y-2 text-sm">
                <div>{job.clientInfo.name}</div>
                <div className="text-gray-600">
                  {job.clientInfo.completedProjects} projects completed
                </div>
                <div className="text-gray-600">
                  Member since {job.clientInfo.memberSince}
                </div>
                <div className="text-gray-600">{job.location}</div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Project Budget
              </h3>
              <div className="text-2xl font-bold text-gray-900">
                {job.payment}
              </div>
              <div className="text-sm text-gray-600">Fixed Price</div>
            </Card>

            <Button
              onClick={handleSubmitProposal}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              disabled={!proposal.coverLetter || !proposal.hourlyRate}
            >
              Submit Proposal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
