// API configuration and base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  profileComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  client: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
  };
  skills: string[];
  category: string;
  location: string;
  timeframe: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  proposals: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancer: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  coverLetter: string;
  proposedBudget: number;
  proposedTimeframe: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// API utility functions
class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(email: string, password: string, name: string, role: 'client' | 'freelancer'): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/users/me');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.request('/users/avatar', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  // Job endpoints
  async getJobs(filters?: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    location?: string;
    skills?: string[];
    search?: string;
  }): Promise<ApiResponse<Job[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    return this.request(`/jobs?${params.toString()}`);
  }

  async getJobById(id: string): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData: {
    title: string;
    description: string;
    budget: { min: number; max: number; type: 'fixed' | 'hourly' };
    skills: string[];
    category: string;
    location: string;
    timeframe: string;
  }): Promise<ApiResponse<Job>> {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse> {
    return this.request(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  // Proposal endpoints
  async getProposals(jobId?: string): Promise<ApiResponse<Proposal[]>> {
    const endpoint = jobId ? `/proposals?jobId=${jobId}` : '/proposals';
    return this.request(endpoint);
  }

  async createProposal(proposalData: {
    jobId: string;
    coverLetter: string;
    proposedBudget: number;
    proposedTimeframe: string;
  }): Promise<ApiResponse<Proposal>> {
    return this.request('/proposals', {
      method: 'POST',
      body: JSON.stringify(proposalData),
    });
  }

  async updateProposal(id: string, data: Partial<Proposal>): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async acceptProposal(id: string): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}/accept`, {
      method: 'POST',
    });
  }

  async rejectProposal(id: string): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}/reject`, {
      method: 'POST',
    });
  }

  // Chat/Messages endpoints
  async getConversations(): Promise<ApiResponse<any[]>> {
    return this.request('/messages/conversations');
  }

  async getMessages(conversationId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/messages/conversations/${conversationId}`);
  }

  async sendMessage(conversationId: string, message: string): Promise<ApiResponse<any>> {
    return this.request(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Notifications endpoints
  async getNotifications(): Promise<ApiResponse<any[]>> {
    return this.request('/notifications');
  }

  async markNotificationRead(id: string): Promise<ApiResponse> {
    return this.request(`/notifications/${id}/read`, {
      method: 'POST',
    });
  }

  // Payment endpoints
  async createPayment(data: {
    amount: number;
    proposalId: string;
    description: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPayments(): Promise<ApiResponse<any[]>> {
    return this.request('/payments');
  }

  // Review endpoints
  async createReview(data: {
    jobId: string;
    revieweeId: string;
    rating: number;
    comment: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReviews(userId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/reviews/user/${userId}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export mock data for development
export const mockData = {
  jobs: [
    {
      id: '1',
      title: 'Modern Website Design for Tech Startup',
      description: 'Looking for a talented web designer to create a modern, responsive website for our tech startup. The design should be clean, professional, and user-friendly.',
      clientId: '1',
      client: {
        id: '1',
        name: 'TechCorp Inc.',
        avatar: '/images/profile.jpg',
        rating: 4.8,
      },
      budget: { min: 2000, max: 5000, type: 'fixed' as const },
      skills: ['UI/UX Design', 'React', 'TypeScript', 'Figma'],
      category: 'web-development',
      location: 'Remote',
      timeframe: '2-4 weeks',
      status: 'open' as const,
      proposals: 12,
      createdAt: '2024-01-18T10:00:00Z',
      updatedAt: '2024-01-18T10:00:00Z',
    },
    {
      id: '2',
      title: 'Mobile App Development - iOS & Android',
      description: 'Need an experienced mobile developer to create a cross-platform mobile application for food delivery service.',
      clientId: '2',
      client: {
        id: '2',
        name: 'FoodieApp LLC',
        avatar: '/images/profile.jpg',
        rating: 4.9,
      },
      budget: { min: 8000, max: 15000, type: 'fixed' as const },
      skills: ['React Native', 'JavaScript', 'API Integration', 'Mobile UI'],
      category: 'mobile-development',
      location: 'Remote',
      timeframe: '6-8 weeks',
      status: 'open' as const,
      proposals: 8,
      createdAt: '2024-01-19T10:00:00Z',
      updatedAt: '2024-01-19T10:00:00Z',
    },
    {
      id: '3',
      title: 'Content Writing for Blog Series',
      description: 'Seeking a skilled content writer to create engaging blog posts about sustainable living and eco-friendly practices.',
      clientId: '3',
      client: {
        id: '3',
        name: 'GreenLife Media',
        avatar: '/images/profile.jpg',
        rating: 4.7,
      },
      budget: { min: 500, max: 1200, type: 'fixed' as const },
      skills: ['Content Writing', 'SEO', 'Research', 'Copywriting'],
      category: 'writing',
      location: 'Remote',
      timeframe: '3-5 weeks',
      status: 'open' as const,
      proposals: 15,
      createdAt: '2024-01-17T10:00:00Z',
      updatedAt: '2024-01-17T10:00:00Z',
    },
  ],
};
