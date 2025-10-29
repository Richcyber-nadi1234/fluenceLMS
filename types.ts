export type Role = 'admin' | 'instructor' | 'student' | 'parent';

export interface User {
  id?: number;
  name: string;
  role: Role;
  studentName?: string; // for parent
  courses?: string[]; // for instructor
}

export interface PerformanceData {
  date: string;
  score: number;
}

export interface InstructorNote {
  id: number;
  instructorName: string;
  date: string;
  note: string;
}

export interface School {
    id: number;
    name: string;
    logoUrl?: string;
    location: string;
    category: 'International' | 'Public' | 'Private' | 'Other';
}

export interface DashboardStudent {
  id: number;
  name: string;
  email: string;
  schoolId: number;
  overallScore: number;
  attendance: number;
  assignmentsCompleted: number;
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  courses: string[];
}

export interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Completed' | 'Overdue';
  score?: number;
  description?: string;
  resources?: { name: string; url: string }[];
  feedback?: { instructorName: string; comment: string };
  studentId: number;
  reminderSet?: boolean;
}

export interface AssignmentScoreData {
  name: string;
  score: number;
}

export interface UpcomingSession {
  id: number;
  course: string;
  date: string;
  time: string;
  students: number[];
}