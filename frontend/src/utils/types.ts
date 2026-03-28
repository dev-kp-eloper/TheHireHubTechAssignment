export interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  openPositions: number;
  hiringManager: string;
  totalApplicants?: number;
  description?: string;
  requirements?: string[];
}

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  experience: number;
  skills: string[];
  resume?: string;
  jobId: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired' | 'Rejected';
  matchScore: number;
  lastActivity: string;
  notes: string[];
  interviewStatus: 'Pending' | 'Scheduled' | 'Completed' | 'Not Started';
  interviewDate?: string;
}

export interface CandidateFilters {
  stage?: string;
  minExperience?: number;
  maxExperience?: number;
  minScore?: number;
  maxScore?: number;
  search?: string;
}
