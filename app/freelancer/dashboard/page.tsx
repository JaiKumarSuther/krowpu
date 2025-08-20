"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService, mockData, Job } from "@/services/api";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  Users, 
  Calendar,
  Eye,
  Heart,
  Send,
  CheckCircle,
  XCircle
} from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";
import OutlinedGrayButton from "@/components/buttons/OutlinedGrayButton";

interface FreelancerStats {
  totalEarnings: number;
  activeProjects: number;
  completedProjects: number;
  clientRating: number;
  totalProposals: number;
  successRate: number;
}

interface FreelancerProposal {
  id: string;
  jobId: string;
  jobTitle: string;
  client: string;
  status: 'pending' | 'accepted' | 'rejected';
  proposedAmount: number;
  submittedAt: string;
}

// Move mock data outside component to prevent re-creation
const mockProposals: FreelancerProposal[] = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Modern Website Design for Tech Startup',
    client: 'TechCorp Inc.',
    status: 'pending',
    proposedAmount: 3500,
    submittedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'Mobile App Development - iOS & Android',
    client: 'FoodieApp LLC',
    status: 'accepted',
    proposedAmount: 12000,
    submittedAt: '2024-01-19T15:30:00Z',
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'Content Writing for Blog Series',
    client: 'GreenLife Media',
    status: 'rejected',
    proposedAmount: 800,
    submittedAt: '2024-01-18T09:15:00Z',
  },
];

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'proposals' | 'projects'>('browse');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [proposals, setProposals] = useState<FreelancerProposal[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const { user } = useAuth();

  // Mock freelancer stats
  const stats: FreelancerStats = {
    totalEarnings: 24500,
    activeProjects: 3,
    completedProjects: 12,
    clientRating: 4.9,
    totalProposals: 45,
    successRate: 73,
  };

  useEffect(() => {
    const loadData = async () => {
      console.log('Loading freelancer dashboard data...');
      setLoading(true);
      try {
        // Use mock data in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Using mock data for development');
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Ensure mockData.jobs exists and is an array
          if (mockData && mockData.jobs && Array.isArray(mockData.jobs)) {
            console.log('Mock jobs:', mockData.jobs);
            setJobs(mockData.jobs);
          } else {
            console.error('mockData.jobs is not available or not an array');
            setJobs([]);
          }
          
          console.log('Mock proposals:', mockProposals);
          setProposals(mockProposals);
          console.log('Data loaded successfully');
        } else {
          console.log('Loading data from API...');
          const [jobsResponse, proposalsResponse] = await Promise.all([
            apiService.getJobs({ search: searchQuery }),
            apiService.getProposals(),
          ]);

          if (jobsResponse.success && jobsResponse.data) {
            setJobs(jobsResponse.data);
          }
          if (proposalsResponse.success && proposalsResponse.data) {
            // Transform API proposals to FreelancerProposal format
            const transformedProposals: FreelancerProposal[] = proposalsResponse.data.map(p => ({
              id: p.id,
              jobId: p.jobId,
              jobTitle: 'Job Title', // This would come from job data
              client: 'Client Name', // This would come from job/client data
              status: p.status,
              proposedAmount: 0, // This would come from proposal data
              submittedAt: p.createdAt || new Date().toISOString(),
            }));
            setProposals(transformedProposals);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setJobs([]);
        setProposals([]);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    loadData();
  }, [searchQuery]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return '1 day ago';
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Freelancer'}!
          </h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your freelance work today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-500">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Calendar size={16} className="text-blue-500 mr-1" />
              <span className="text-gray-600">2 due this week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Client Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.clientRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star size={16} className="text-yellow-500 mr-1 fill-current" />
              <span className="text-gray-600">Based on {stats.completedProjects} reviews</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Send size={16} className="text-purple-500 mr-1" />
              <span className="text-gray-600">{stats.totalProposals} proposals sent</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { id: 'browse' as const, label: 'Browse Jobs', count: jobs.length },
                { id: 'proposals' as const, label: 'My Proposals', count: proposals.length },
                { id: 'projects' as const, label: 'Active Projects', count: stats.activeProjects },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-1 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Browse Jobs Tab */}
            {activeTab === 'browse' && (
              <div>
                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={20} />
                      Filters
                    </button>
                  </div>
                </div>

                {/* Jobs List */}
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <DollarSign size={16} />
                              <span>${job.budget.min.toLocaleString()} - ${job.budget.max.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{job.timeframe}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className={`p-2 rounded-full transition-colors ${
                            savedJobs.includes(job.id)
                              ? 'text-red-500 hover:bg-red-50'
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <Heart size={20} className={savedJobs.includes(job.id) ? 'fill-current' : ''} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>by {job.client.name}</span>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span>{job.client.rating}</span>
                          </div>
                          <span>{job.proposals} proposals</span>
                          <span>{formatDate(job.createdAt)}</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <OutlinedGrayButton label="View Details" />
                          <GreenButton label="Apply Now" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Proposals Tab */}
            {activeTab === 'proposals' && (
              <div>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.jobTitle}</h3>
                          <p className="text-gray-600 mb-2">Client: {proposal.client}</p>
                          <p className="text-gray-600 mb-3">Proposed Amount: {formatCurrency(proposal.proposedAmount)}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                          {getStatusIcon(proposal.status)}
                          <span className="capitalize">{proposal.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Submitted {formatDate(proposal.submittedAt)}</span>
                        <div className="flex gap-2">
                          <button className="text-green-600 hover:text-green-700 font-medium">
                            <Eye size={16} className="inline mr-1" />
                            View Details
                          </button>
                          {proposal.status === 'pending' && (
                            <button className="text-blue-600 hover:text-blue-700 font-medium ml-4">
                              Edit Proposal
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Projects Tab */}
            {activeTab === 'projects' && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Projects</h3>
                <p className="text-gray-600 mb-4">
                  Your active projects will appear here once you start working with clients.
                </p>
                <GreenButton label="Browse Jobs" onClick={() => setActiveTab('browse')} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
