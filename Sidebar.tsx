export type ViewPage = 'pageHome' | 'page1' | 'page2' | 'page3' | 'page4' | 'page5';

export type JobStatus = 'active' | 'done' | 'urgent' | 'hold';

export interface JobOrder {
  id: string;
  pos: string;
  status: JobStatus;
  open: string;
  total: number;
  filled: number;
  pic: string;
  company: string;
  pdfUrl?: string;
  department?: string;
  salaryMin?: string;
  salaryMax?: string;
  description?: string;
}

export interface BusinessUnit {
  id: string;
  code: string;
  name: string;
  sub: string;
  tag: string;
  color: string;
  header: {
    pic: string;
  };
  jobs: JobOrder[];
  isFavorite?: boolean;
}

export interface ActivityLog {
  t: string;
  d: string;
}

export interface Attachment {
  name: string;
  date: string;
  size?: string;
}

export interface TalentPoolCandidate {
  id: number;
  initials: string;
  name: string;
  role: string;
  loc: string;
  rate: string;
  unit: string;
  status: 'top' | 'avail';
  tagline: string;
  org: string;
  edu?: string;
  applied: string;
  stage: string;
  psychPassed: boolean;
  isFavorite?: boolean;
  attachments: Attachment[];
  activities: ActivityLog[];
  projectsCount?: number;
  messagesCount?: number;
  feedbackCount?: number;
}

export interface ScreeningCandidate {
  id: number;
  name: string;
  initials: string;
  email: string;
  dept: string;
  position: string;
  status: 'Done' | 'Pending' | 'Cancel' | 'Idle' | 'Pengerjaan';
  statusLabel: string;
  steps: string[];
  recommended: boolean;
  note: string;
  org: string;
  edu: string;
  loc: string;
  activities: ActivityLog[];
  attachments: Attachment[];
}

export interface KanbanCandidate {
  id: string;
  name: string;
  date: string;
  stage: string;
  unitId: string;
  jobPos: string;
  initials?: string;
  psychPassed?: boolean;
}

export interface OnboardingEvent {
  id: string;
  month: string;
  day: string;
  name: string;
  role: string;
  dept: string;
}

export interface AICandidateAnalysis {
  matchScore: number;
  suitability: string;
  strengths: string[];
  growthAreas: string[];
  suggestedQuestions: string[];
  recommendation: 'Highly Recommended' | 'Consider with Reservation' | 'Not Recommended';
}
