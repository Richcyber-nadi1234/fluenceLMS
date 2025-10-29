import type { User, PerformanceData, InstructorNote, Assignment, DashboardStudent, Instructor, School, UpcomingSession } from './types';

export const mockParentUser: User = {
  name: 'Ama',
  role: 'parent',
  studentName: 'Kwame',
};

export const mockStudentUser: User = {
    id: 1,
    name: 'Kwame',
    role: 'student',
};

export const mockAdminUser: User = {
    name: 'Admin User',
    role: 'admin',
};

export const mockInstructorUser: User & { role: 'instructor' } = {
    id: 1,
    name: 'Aisha Mensah',
    role: 'instructor',
    courses: ['Python Beginners', 'Advanced Python']
};

export const mockPerformanceData: PerformanceData[] = [
  { date: 'Mar 4', score: 75 },
  { date: 'Mar 11', score: 82 },
  { date: 'Mar 18', score: 78 },
  { date: 'Mar 25', score: 85 },
  { date: 'Apr 1', score: 92 },
  { date: 'Apr 8', score: 88 },
  { date: 'Apr 15', score: 95 },
];

export const mockInstructorNotes: InstructorNote[] = [
  {
    id: 1,
    instructorName: 'Aisha Mensah',
    date: '2024-04-15T10:00:00Z',
    note: "Kwame is showing great improvement in understanding loops and data structures. His last assignment was excellent. Keep up the great work!",
  },
  {
    id: 2,
    instructorName: 'Aisha Mensah',
    date: '2024-04-08T14:30:00Z',
    note: 'Had a good session today. Kwame participated well in the group discussion on algorithms. He could benefit from practicing more complex problems.',
  },
];

export const mockSchools: School[] = [
    { id: 1, name: "Accra International School", location: "East Legon, Accra", category: 'International', logoUrl: 'https://placehold.co/100x100/0B66FF/FFFFFF/png?text=AIS' },
    { id: 2, name: "Kumasi STEM Academy", location: "Asokwa, Kumasi", category: 'Public', logoUrl: 'https://placehold.co/100x100/FF7A2D/FFFFFF/png?text=KSA' },
    { id: 3, name: "Takoradi Tech High", location: "Effia-Kwesimintsim, Takoradi", category: 'Private', logoUrl: 'https://placehold.co/100x100/1F2937/FFFFFF/png?text=TTH' },
];


export const mockStudents: DashboardStudent[] = [
    { id: 1, name: 'Kwame Mensah', email: 'kwame.m@example.com', schoolId: 1, overallScore: 88, attendance: 95, assignmentsCompleted: 12 },
    { id: 2, name: 'Adjoa Boateng', email: 'adjoa.b@example.com', schoolId: 1, overallScore: 92, attendance: 98, assignmentsCompleted: 14 },
    { id: 3, name: 'Kofi Annan Jr.', email: 'kofi.a@example.com', schoolId: 2, overallScore: 85, attendance: 90, assignmentsCompleted: 11 },
    { id: 4, name: 'Efia Sutherland', email: 'efia.s@example.com', schoolId: 2, overallScore: 95, attendance: 100, assignmentsCompleted: 15 },
    { id: 5, name: 'Yaw Asante', email: 'yaw.a@example.com', schoolId: 3, overallScore: 82, attendance: 88, assignmentsCompleted: 10 },
];

export const mockInstructors: Instructor[] = [
  { id: 1, name: 'Aisha Mensah', email: 'a.mensah@fluence.edu', courses: ['Python Beginners', 'Advanced Python'], avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 2, name: 'Babatunde Adebayo', email: 'b.adebayo@fluence.edu', courses: ['Web Development', 'JavaScript Basics'], avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: 3, name: 'Chidinma Okoro', email: 'c.okoro@fluence.edu', courses: ['Data Science Intro', 'Machine Learning'], avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    studentId: 1,
    title: 'Variables and Data Types',
    course: 'Python Beginners',
    dueDate: '2024-04-10T23:59:59Z',
    status: 'Completed',
    score: 95,
    feedback: { instructorName: 'Aisha Mensah', comment: "Excellent work, Kwame! Your understanding of data types is very clear." }
  },
  {
    id: 2,
    studentId: 1,
    title: 'Functions and Loops',
    course: 'Python Beginners',
    dueDate: '2024-04-18T23:59:59Z',
    status: 'Completed',
    score: 88,
    feedback: { instructorName: 'Aisha Mensah', comment: "Good job on the loops. Remember to add more comments to your functions to explain their purpose." }
  },
  {
    id: 3,
    studentId: 1,
    title: 'Data Structures: Lists & Dictionaries',
    course: 'Python Beginners',
    dueDate: '2024-04-25T23:59:59Z',
    status: 'Submitted',
  },
  {
    id: 4,
    studentId: 1,
    title: 'Object-Oriented Programming Basics',
    course: 'Advanced Python',
    dueDate: '2024-05-02T23:59:59Z',
    status: 'Pending',
    description: "Create a simple class hierarchy for a 'Vehicle' with subclasses for 'Car' and 'Motorcycle'. Include attributes and methods for each.",
    resources: [{ name: "OOP_Guide.pdf", url: "#" }]
  },
  {
    id: 5,
    studentId: 1,
    title: 'File I/O',
    course: 'Advanced Python',
    dueDate: '2024-03-20T23:59:59Z',
    status: 'Overdue',
  },
];


export const mockUpcomingSessions: UpcomingSession[] = [
    { id: 1, course: 'Advanced Python', date: '2024-04-22', time: '14:00', students: [1,2,3,4,5] },
    { id: 2, course: 'Python Beginners', date: '2024-04-23', time: '10:00', students: [1,2,3] },
    { id: 3, course: 'Data Science Intro', date: '2024-04-24', time: '11:00', students: [4,5] },
];