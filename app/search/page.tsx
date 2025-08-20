"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, MapPin, DollarSign, Clock, Star } from "lucide-react";
import GreenButton from "@/components/buttons/GreenButton";
import OutlinedGrayButton from "@/components/buttons/OutlinedGrayButton";
import { apiService, mockData, Job } from "@/services/api";

// Job interface imported from api service

const SearchContent = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    timeframe: '',
    location: '',
    skills: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Helper function to format budget
  const formatBudget = (budget: { min: number; max: number; type: 'fixed' | 'hourly' }) => {
    return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}${budget.type === 'hourly' ? '/hr' : ''}`;
  };

  // Helper function to format date
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

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      
      try {
        // In development, use mock data. In production, use API
        if (process.env.NODE_ENV === 'development') {
          // Use mock data for now
          let filteredJobs = mockData.jobs;
          
          if (query) {
            filteredJobs = filteredJobs.filter(job => 
              job.title.toLowerCase().includes(query.toLowerCase()) ||
              job.description.toLowerCase().includes(query.toLowerCase()) ||
              job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
            );
          }
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setJobs(filteredJobs);
        } else {
          // Use actual API
          const response = await apiService.getJobs({
            search: query,
            category: filters.category,
            minBudget: filters.minBudget ? Number(filters.minBudget) : undefined,
            maxBudget: filters.maxBudget ? Number(filters.maxBudget) : undefined,
            location: filters.location,
            skills: filters.skills,
          });
          
          if (response.success && response.data) {
            setJobs(response.data);
          } else {
            console.error('Failed to fetch jobs:', response.error);
            setJobs([]);
          }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [query, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search with current query
    setLoading(true);
    // In real app, this would make API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const JobCard = ({ job }: { job: Job }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{job.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>{formatBudget(job.budget)}</span>
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
          <OutlinedGrayButton label="Save" />
          <GreenButton label="Apply Now" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs, skills, or companies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              Filters
            </button>
            <GreenButton label="Search" />
          </form>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="">All Categories</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="writing">Writing</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={filters.minBudget}
                      onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={filters.maxBudget}
                      onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.timeframe}
                    onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                  >
                    <option value="">Any Timeframe</option>
                    <option value="1-week">Less than 1 week</option>
                    <option value="1-month">Less than 1 month</option>
                    <option value="3-months">1-3 months</option>
                    <option value="6-months">3-6 months</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="">Anywhere</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {query ? `Search results for "${query}"` : 'All Jobs'}
              </h1>
              <span className="text-gray-600">
                {loading ? 'Searching...' : `${jobs.length} jobs found`}
              </span>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <GreenButton label="Browse All Jobs" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
