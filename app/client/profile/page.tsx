"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaEdit, FaEye, FaCheck, FaBriefcase, FaUsers, FaClock } from "react-icons/fa";

const ClientProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith", 
    email: "john@company.com",
    password: "At least 6 characters",
    company: "Tech Solutions Inc",
    industry: "Technology",
    totalBudget: "$25,000",
    projectsPosted: "12",
    activeProjects: "5",
    cardholderName: "John Smith",
    cardNumber: "5254 7634 8734 7890",
    exp: "24/24",
    cvv: "783"
  });

  const projectTypes = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design", 
    "Digital Marketing",
    "Content Writing",
    "SEO Optimization",
    "Brand Design",
    "Video Production",
    "Data Analysis"
  ];

  const industries = [
    "Technology", "Healthcare", "Finance",
    "E-commerce", "Education", "Real Estate", 
    "Marketing", "Consulting", "Manufacturing"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_100%)]  p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">Client Profile</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <FaEye className="w-4 h-4" />
              See Public View
            </Button>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <FaEdit className="w-4 h-4" />
              Profile Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-2xl">JS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[hsl(0_0%_100%)]/80 flex items-center justify-center">
                    <FaCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-1">John Smith</h2>
                  <p className="text-[hsl(215.4_16.3%_46.9%)]  mb-2">Tech Solutions Inc</p>
                  <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Member since Jan 15, 2022</p>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">12</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Projects Posted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">$25k</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">4.9</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]  block mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Company Description */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
              <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">
                About Tech Solutions Inc
              </h3>
              <p className="text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed mb-4">
                We are a forward-thinking technology company specializing in innovative digital solutions for businesses across various industries. Our team is passionate about leveraging cutting-edge technologies to solve complex business challenges and drive growth for our clients.
              </p>
              <p className="text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
                We work with talented freelancers to bring diverse expertise to our projects, from web development and mobile applications to digital marketing and design. We value long-term partnerships and believe in creating opportunities for mutual growth and success.
              </p>
              
              {/* Project Types */}
              <div className="mt-6">
                <h4 className="font-medium text-[hsl(222.2_84%_4.9%)]  mb-3">Typical Project Types</h4>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[hsl(210_40%_96.1%)]  text-[hsl(215.4_16.3%_46.9%)]  text-sm rounded-full border border-[hsl(214.3_31.8%_91.4%)] "
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
              <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Recent Projects</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "E-commerce Platform Development",
                    status: "Completed",
                    budget: "$5,000",
                    freelancer: "Sarah Johnson"
                  },
                  {
                    title: "Mobile App UI/UX Design",
                    status: "In Progress", 
                    budget: "$3,500",
                    freelancer: "Mike Chen"
                  },
                  {
                    title: "Digital Marketing Campaign",
                    status: "In Progress",
                    budget: "$2,800",
                    freelancer: "Emma Davis"
                  }
                ].map((project, index) => (
                  <div key={index} className="p-4 bg-[hsl(210_40%_96.1%)]  rounded-lg border border-[hsl(214.3_31.8%_91.4%)] ">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[hsl(222.2_84%_4.9%)] ">{project.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-[hsl(215.4_16.3%_46.9%)] ">
                      <span>Freelancer: {project.freelancer}</span>
                      <span>Budget: {project.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-4 text-center">
                <FaBriefcase className="w-6 h-6 text-[hsl(160_84%_39%)]  mx-auto mb-2" />
                <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">5</div>
                <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Active Projects</div>
              </div>
              
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-4 text-center">
                <FaUsers className="w-6 h-6 text-[hsl(160_84%_39%)]  mx-auto mb-2" />
                <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">28</div>
                <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Freelancers Hired</div>
              </div>
              
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-4 text-center">
                <FaClock className="w-6 h-6 text-[hsl(160_84%_39%)]  mx-auto mb-2" />
                <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">24h</div>
                <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Avg Response Time</div>
              </div>
            </div>

            {/* Industry Preferences */}
            {isEditing && (
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Industry</h3>
                <select 
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Payment Info */}
            {isEditing && (
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Payment Information</h3>
                
                <div className="mb-4">
                  <div className="text-center p-4 bg-[hsl(210_40%_96.1%)]  rounded-lg">
                    <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">{formData.totalBudget}</div>
                    <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Total Budget Available</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[hsl(222.2_84%_4.9%)] ">Card Details</h4>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="EXP"
                      value={formData.exp}
                      onChange={(e) => handleInputChange('exp', e.target.value)}
                      className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  Update
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;