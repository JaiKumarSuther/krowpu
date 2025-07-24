"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaEdit, FaEye, FaCheck } from "react-icons/fa";

const FreelancerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Eva",
    lastName: "Watson",
    email: "eva@gmail.com",
    password: "At least 6 characters",
    job: "Gaming Application",
    application: "AI Mobile Application",
    hourlyRate: "$50.00",
    earnings: "$50.00",
    totalRemaining: "$350.00",
    cardholderName: "James Wilson",
    cardNumber: "5254 7634 8734 7890",
    exp: "24/24",
    cvv: "783"
  });

  const skills = [
    "Artificial Intelligence",
    "Career Counselling", 
    "Artificial Intelligence",
    "Career Counselling",
    "Artificial Intelligence",
    "Career Counselling",
    "Career Counselling",
    "Artificial Intelligence",
    "Career Counselling"
  ];

  const preferences = [
    "Wordpress", "Wordpress", "Wordpress",
    "Wordpress", "Wordpress", "Wordpress", 
    "Wordpress", "Wordpress", "Wordpress"
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
          <h1 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">Freelancer Profile</h1>
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
                    <AvatarImage src="/lovable-uploads/9e982583-2603-4a16-a029-4fd0f62c0f0c.png" />
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-2xl">EW</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[hsl(0_0%_100%)]/80 flex items-center justify-center">
                    <FaCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-1">Eva Watson</h2>
                  <p className="text-[hsl(215.4_16.3%_46.9%)]  mb-2">Graphic Designer</p>
                  <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Member since Jul 10, 2021</p>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">233</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Total Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">$600k</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Total Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(222.2_84%_4.9%)] ">100%</div>
                      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)] ">Job Success</div>
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

            {/* Project Description */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
              <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">
                AI Workshop: Supercharge Your Freelance Career with AI Tools
              </h3>
              <p className="text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed mb-4">
                Join our interactive AI Workshop designed exclusively for freelancers! Learn how to integrate cutting-edge AI tools into your workflow to boost productivity, streamline client communication, and stay ahead in the freelance market. Whether you're a designer, writer, developer, or marketer—this session will give you hands-on strategies to elevate your game using AI.
              </p>
              <p className="text-[hsl(215.4_16.3%_46.9%)]  leading-relaxed">
                Join our interactive AI Workshop designed exclusively for freelancers! Learn how to integrate cutting-edge AI tools into your workflow to boost productivity, streamline client communication, and stay ahead in the freelance market. Whether you're a designer, writer, developer, or marketer—this session will give you hands-on strategies to elevate your game using AI.
              </p>
              
              {/* Skills */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[hsl(210_40%_96.1%)]  text-[hsl(215.4_16.3%_46.9%)]  text-sm rounded-full border border-[hsl(214.3_31.8%_91.4%)] "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Work Media */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
              <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Work Media</h3>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)] .map((_, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-[hsl(210_40%_96.1%)]  rounded-lg border border-[hsl(214.3_31.8%_91.4%)] "
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Hourly Rate */}
            <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6 text-center">
              <div className="text-3xl font-bold text-[hsl(222.2_84%_4.9%)]  mb-2">$150</div>
              <div className="text-[hsl(215.4_16.3%_46.9%)] ">Hourly Rate</div>
            </div>

            {/* Preferences */}
            {isEditing && (
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Your preferences</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {preferences.map((pref, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[hsl(210_40%_96.1%)]  text-[hsl(215.4_16.3%_46.9%)]  text-sm rounded-full border border-[hsl(214.3_31.8%_91.4%)] "
                    >
                      {pref}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search Tags"
                    className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] "
                  />
                </div>
              </div>
            )}

            {/* Job Applications */}
            {isEditing && (
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Job</h3>
                <select className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  mb-4 focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] ">
                  <option>Gaming Application</option>
                </select>
                <select className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg px-3 py-2 text-[hsl(222.2_84%_4.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] ">
                  <option>AI Mobile Application</option>
                </select>
              </div>
            )}

            {/* Payment Info */}
            {isEditing && (
              <div className="bg-card rounded-lg border border-[hsl(214.3_31.8%_91.4%)]  p-6">
                <h3 className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Payment</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">{formData.hourlyRate}</div>
                    <div className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">Hourly Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">{formData.earnings}</div>
                    <div className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[hsl(222.2_84%_4.9%)] ">{formData.totalRemaining}</div>
                    <div className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">Total Remaining</div>
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

export default FreelancerProfilePage;