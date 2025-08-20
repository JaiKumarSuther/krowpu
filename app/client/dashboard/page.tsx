"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService, Job } from "@/services/api";
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
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  FileText
} from "lucide-react";
import { useRouter } from "next/navigation";
import GreenButton from "@/components/buttons/GreenButton";
import OutlinedGrayButton from "@/components/buttons/OutlinedGrayButton";

interface ClientStats {
  totalSpent: number;
  activeJobs: number;
  completedJobs: number;
  totalFreelancers: number;
  avgRating: number;
  totalProposals: number;
}

interface ClientJob extends Job {
  proposalsCount: number;
  hiredFreelancer?: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
}

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'proposals' | 'projects'>('jobs');
  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  // Mock client stats
  const stats: ClientStats = {
    totalSpent: 45200,
    activeJobs: 5,
    completedJobs: 18,
    totalFreelancers: 23,
    avgRating: 4.8,
    totalProposals: 127,
  };

  // Mock client jobs data - moved inside useEffect to fix dependency warning
  const mockClientJobs = useMemo(() => [
    {
      id: '1',
      title: 'Modern Website Design for Tech Startup',
      description: 'Looking for a talented web designer to create a modern, responsive website for our tech startup. The design should be clean, professional, and user-friendly.',
      clientId: user?.id || '1',
      client: {
        id: user?.id || '1',
        name: user?.name || 'You',
        avatar: user?.avatar || '/images/profile.jpg',
        rating: 4.8,
      },
      budget: { min: 2000, max: 5000, type: 'fixed' as const },
      skills: ['UI/UX Design', 'React', 'TypeScript', 'Figma'],
      category: 'web-development',
      location: 'Remote',
      timeframe: '2-4 weeks',
      status: 'open' as const,
      proposals: 12,
      proposalsCount: 12,
      createdAt: '2024-01-18T10:00:00Z',
      updatedAt: '2024-01-18T10:00:00Z',
    },
    {
      id: '2',
      title: 'Mobile App Development - iOS & Android',
      description: 'Need an experienced mobile developer to create a cross-platform mobile application for food delivery service.',
      clientId: user?.id || '1',
      client: {
        id: user?.id || '1',
        name: user?.name || 'You',
        avatar: user?.avatar || '/images/profile.jpg',
        rating: 4.9,
      },
      budget: { min: 8000, max: 15000, type: 'fixed' as const },
      skills: ['React Native', 'JavaScript', 'API Integration', 'Mobile UI'],
      category: 'mobile-development',
      location: 'Remote',
      timeframe: '6-8 weeks',
      status: 'in_progress' as const,
      proposals: 8,
      proposalsCount: 8,
      createdAt: '2024-01-19T10:00:00Z',
      updatedAt: '2024-01-19T10:00:00Z',
      hiredFreelancer: {
        id: '2',
        name: 'John Smith',
        avatar: '/images/profile.jpg',
        rating: 4.9,
      },
    },
    {
      id: '3',
      title: 'Content Writing for Blog Series',
      description: 'Seeking a skilled content writer to create engaging blog posts about sustainable living and eco-friendly practices.',
      clientId: user?.id || '1',
      client: {
        id: user?.id || '1',
        name: user?.name || 'You',
        avatar: user?.avatar || '/images/profile.jpg',
        rating: 4.7,
      },
      budget: { min: 500, max: 1200, type: 'fixed' as const },
      skills: ['Content Writing', 'SEO', 'Research', 'Copywriting'],
      category: 'writing',
      location: 'Remote',
      timeframe: '3-5 weeks',
      status: 'completed' as const,
      proposals: 15,
      proposalsCount: 15,
      createdAt: '2024-01-17T10:00:00Z',
      updatedAt: '2024-01-17T10:00:00Z',
      hiredFreelancer: {
        id: '3',
        name: 'Sarah Wilson',
        avatar: '/images/profile.jpg',
        rating: 4.8,
      },
    },
  ] as ClientJob[], [user?.id, user?.name, user?.avatar]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Use mock data in development
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 800));
          console.log('Setting jobs:', mockClientJobs);
          setJobs(mockClientJobs);
        } else {
          const response = await apiService.getJobs({ search: searchQuery });
          if (response.success && response.data) {
            // Filter jobs by current client
            const clientJobs = response.data.filter(job => job.clientId === user?.id);
            setJobs(clientJobs as ClientJob[]);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [searchQuery, user, mockClientJobs]);

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
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} />;
      case 'in_progress': return <Clock size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'Client'}!
            </h1>
            <p className="text-gray-600">Manage your projects and find the perfect talent for your needs.</p>
          </div>
          <GreenButton 
            label="Post New Job" 
            onClick={() => window.location.href = '/client/post-job'}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-500">+8% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Calendar size={16} className="text-blue-500 mr-1" />
              <span className="text-gray-600">{stats.totalProposals} total proposals</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Freelancers Hired</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFreelancers}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Users size={16} className="text-purple-500 mr-1" />
              <span className="text-gray-600">{stats.completedJobs} completed projects</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Star size={16} className="text-yellow-500 mr-1 fill-current" />
              <span className="text-gray-600">From {stats.completedJobs} reviews</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { id: 'jobs' as const, label: 'My Jobs', count: jobs.length },
                { id: 'proposals' as const, label: 'All Proposals', count: stats.totalProposals },
                { id: 'projects' as const, label: 'Active Projects', count: stats.activeJobs },
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
            {/* My Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                {/* Search */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search your jobs..."
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
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                              {getStatusIcon(job.status)}
                              <span className="capitalize">{job.status.replace('_', ' ')}</span>
                            </div>
                          </div>
                          
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
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              <span>{job.proposalsCount} proposals</span>
                            </div>
                          </div>
                          
                          {job.hiredFreelancer && (
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-4">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 text-sm font-medium">
                                  {job.hiredFreelancer.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Hired: {job.hiredFreelancer.name}
                                </p>
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600">{job.hiredFreelancer.rating}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2">
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
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Posted {formatDate(job.createdAt)}</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <OutlinedGrayButton label="View Details" />
                          {/* Debug: Always show button for testing */}
                          <button
                            onClick={() => {
                              console.log('View Proposals clicked for job:', job.id);
                              router.push(`/client/job/${job.id}/proposals`);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            <FileText size={16} />
                            View Proposals ({job.proposalsCount})
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proposals Tab */}
            {activeTab === 'proposals' && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">All Proposals</h3>
                <p className="text-gray-600 mb-4">
                  View and manage all proposals received for your jobs.
                </p>
                <GreenButton label="View Proposals" />
              </div>
            )}

            {/* Active Projects Tab */}
            {activeTab === 'projects' && (
              <div className="text-center py-12">
                <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Projects</h3>
                <p className="text-gray-600 mb-4">
                  Track progress and communicate with freelancers on your active projects.
                </p>
                <GreenButton label="View Projects" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
