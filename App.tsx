import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ParentDashboard } from './components/ParentDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { Header } from './components/Header';
import { User, School, DashboardStudent, Instructor, Assignment, UpcomingSession } from './types';
import {
    mockParentUser, mockStudentUser, mockInstructorUser,
    mockPerformanceData, mockInstructorNotes, mockAssignments, mockStudents, mockInstructors, mockSchools, mockUpcomingSessions
} from './mockData';
import { InstructorListPage } from './components/admin/InstructorListPage';
import { StudentListPage } from './components/admin/StudentListPage';
import { CourseListPage } from './components/admin/CourseListPage';
import { StudentsBySchoolPage } from './components/admin/StudentsBySchoolPage';
import { AddInstructorPage } from './components/admin/AddInstructorPage';
import { InstructorProfilePage } from './components/admin/InstructorProfilePage';
import { AddClassPage } from './components/admin/AddClassPage';
import { StudentAssignmentPage } from './components/StudentAssignmentPage';
import { LiveSessionPage } from './components/instructor/LiveSessionPage';
import { AddStudentPage } from './components/admin/AddStudentPage';
import { AddSchoolPage } from './components/admin/AddSchoolPage';
import { EditSchoolPage } from './components/admin/EditSchoolPage';


type AppView =
  | 'login'
  | 'register'
  | 'parent_dashboard'
  | 'student_dashboard'
  | 'student_assignments'
  | 'admin_dashboard'
  | 'admin_instructors'
  | 'admin_add_instructor'
  | 'admin_instructor_profile'
  | 'admin_add_class'
  | 'admin_students'
  | 'admin_add_student'
  | 'admin_courses'
  | 'admin_schools'
  | 'admin_add_school'
  | 'admin_edit_school'
  | 'instructor_dashboard'
  | 'instructor_live_session'
  ;

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [view, setView] = useState<AppView>('login');
    
    // Admin state
    const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
    const [students, setStudents] = useState<DashboardStudent[]>(mockStudents);
    const [schools, setSchools] = useState<School[]>(mockSchools);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<DashboardStudent | null>(null);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    // Instructor state
    const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>(mockUpcomingSessions);
    const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

    // Student state for parent/admin view
    const studentData = {
        todaySummary: { classesAttended: 1, assignmentsCompleted: 1 },
        performanceData: mockPerformanceData,
        instructorNotes: mockInstructorNotes,
        assignments: assignments.filter(a => a.studentId === (selectedStudent?.id || mockStudentUser.id)),
    };
    
    const handleLogin = (userData: User) => {
        setUser(userData);
        switch (userData.role) {
            case 'parent': setView('parent_dashboard'); break;
            case 'student': setView('student_dashboard'); break;
            case 'admin': setView('admin_dashboard'); break;
            case 'instructor': setView('instructor_dashboard'); break;
        }
    };

    const handleLogout = () => {
        setUser(null);
        setView('login');
    };

    const handleRegister = (userData: Omit<User, 'id'>) => {
        console.log("New user registered:", userData);
        // For demo, log them in immediately
        const newUser = { ...userData, id: Math.random() };
        handleLogin(newUser);
    };

    const handleViewInstructor = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        setView('admin_instructor_profile');
    };

    const handleViewStudentAsAdmin = (student: DashboardStudent) => {
        setSelectedStudent(student);
        setView('student_dashboard'); // Admin views student dashboard
    }
    
    const handleAddInstructor = (instructorData: Omit<Instructor, 'id'>) => {
      const newInstructor = { ...instructorData, id: Math.max(...instructors.map(i => i.id)) + 1 };
      setInstructors([...instructors, newInstructor]);
      setView('admin_instructors');
    };

    const handleAssignCourse = (courseName: string) => {
      if (selectedInstructor) {
        setInstructors(instructors.map(i => 
          i.id === selectedInstructor.id 
            ? { ...i, courses: [...i.courses, courseName] } 
            : i
        ));
        setSelectedInstructor(prev => prev ? { ...prev, courses: [...prev.courses, courseName] } : null);
        setView('admin_instructor_profile');
      }
    };

    const handleAddStudent = (studentData: Omit<DashboardStudent, 'id'>) => {
      const newStudent: DashboardStudent = { ...studentData, id: Math.max(...students.map(s => s.id)) + 1 };
      setStudents([...students, newStudent]);
      setView('admin_students');
    };

    const handleAddSchool = (schoolData: Omit<School, 'id'>) => {
      const newSchool = { ...schoolData, id: Math.max(...schools.map(s => s.id)) + 1 };
      setSchools([...schools, newSchool]);
      setView('admin_schools');
    };
    
    const handleEditSchool = (schoolData: School) => {
      setSchools(schools.map(s => s.id === schoolData.id ? schoolData : s));
      setView('admin_schools');
    };
    
    // Instructor handlers
    const handleScheduleSession = (session: Omit<UpcomingSession, 'id' | 'students'>) => {
        const newSession = { ...session, id: Math.random(), students: students.map(s => s.id) }; // Assign to all students for demo
        setUpcomingSessions([...upcomingSessions, newSession]);
    };
    
    const handleAddAssignment = (data: { title: string; description: string; dueDate: string; course: string; }) => {
        // For demo, create an assignment for each student in that course
        students.forEach(student => {
            const newAssignment: Assignment = {
                id: Math.random(),
                studentId: student.id,
                status: 'Pending',
                ...data
            };
            setAssignments(prev => [...prev, newAssignment]);
        });
    };

    const handleEditAssignment = (id: number, data: { title: string; description: string; dueDate: string; course: string; }) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, ...data } : a));
    };

    const handleDeleteAssignment = (id: number) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };
    
    const handleGradeAssignment = (id: number, score: number, feedback: string) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Completed', score, feedback: { instructorName: user?.name || 'Instructor', comment: feedback } } : a));
    };

    // Student handlers
    const handleAssignmentSubmit = (id: number) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'Submitted' } : a));
    };
    
    const handleSetReminder = (id: number) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, reminderSet: true } : a));
    };


    const renderContent = () => {
        if (!user) {
            switch (view) {
                case 'register': return <RegistrationPage onRegister={handleRegister} onNavigateToLogin={() => setView('login')} />;
                default: return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setView('register')} />;
            }
        }

        switch (view) {
            case 'parent_dashboard': return <ParentDashboard user={mockParentUser} data={studentData} />;
            case 'student_dashboard': {
                let currentStudent: DashboardStudent | undefined;
                if (user.role === 'student') {
                    // Find the student by ID from the logged-in user
                    currentStudent = students.find(s => s.id === user.id);
                } else if (user.role === 'admin' && selectedStudent) {
                    // Use the student selected by the admin
                    currentStudent = selectedStudent;
                } else if (user.role === 'instructor' && selectedStudent) {
                    // Use the student selected by the instructor
                    currentStudent = selectedStudent;
                }

                if (!currentStudent) return <div>Error: Student not found.</div>;

                // Filter assignments for the specific student being viewed
                const studentSpecificData = {
                    ...studentData,
                    assignments: assignments.filter(a => a.studentId === currentStudent!.id),
                };
                
                const onBack = 
                  user.role === 'admin' ? () => { setSelectedStudent(null); setView('admin_students');} :
                  user.role === 'instructor' ? () => { setSelectedStudent(null); setView('instructor_dashboard');} :
                  undefined;

                return <StudentDashboard 
                    student={currentStudent} 
                    data={studentSpecificData} 
                    onBack={onBack} 
                    onNavigateToAssignments={() => setView('student_assignments')} 
                />;
            }
            case 'student_assignments': return <StudentAssignmentPage assignments={assignments.filter(a => a.studentId === mockStudentUser.id)} onBack={() => setView('student_dashboard')} onAssignmentSubmit={handleAssignmentSubmit} onSetReminder={handleSetReminder} />;
            
            case 'admin_dashboard':
                return <AdminDashboard 
                    stats={{ totalStudents: students.length, totalInstructors: instructors.length, schools: schools.length }}
                    instructors={instructors}
                    students={students}
                    onNavigateToStudents={() => setView('admin_students')}
                    onNavigateToInstructors={() => setView('admin_instructors')}
                    onNavigateToSchools={() => setView('admin_schools')}
                    onViewInstructor={handleViewInstructor}
                    onNavigateToAddInstructor={() => setView('admin_add_instructor')}
                />;
            case 'admin_instructors': 
                return <InstructorListPage instructors={instructors} onBack={() => setView('admin_dashboard')} onViewInstructor={handleViewInstructor} onNavigateToAddInstructor={() => setView('admin_add_instructor')} />;
            case 'admin_add_instructor':
                return <AddInstructorPage onAddInstructor={handleAddInstructor} onCancel={() => setView('admin_instructors')} />;
            case 'admin_instructor_profile':
                if (!selectedInstructor) return <div>Error: No instructor selected.</div>;
                return <InstructorProfilePage instructor={selectedInstructor} assignedStudents={students.slice(0,5)} onBack={() => setView('admin_instructors')} onNavigateToAddClass={() => setView('admin_add_class')} />;
            case 'admin_add_class':
                 if (!selectedInstructor) return <div>Error: No instructor selected.</div>;
                return <AddClassPage instructor={selectedInstructor} onAssignCourse={handleAssignCourse} onCancel={() => setView('admin_instructor_profile')} />;
            case 'admin_students':
                return <StudentListPage students={students} schools={schools} onBack={() => setView('admin_dashboard')} onViewStudent={handleViewStudentAsAdmin} onNavigateToAddStudent={() => setView('admin_add_student')} />;
            case 'admin_add_student':
                return <AddStudentPage schools={schools} onAddStudent={handleAddStudent} onCancel={() => setView('admin_students')} />;
            case 'admin_courses':
                const allCourses = instructors.flatMap(i => i.courses);
                return <CourseListPage courses={allCourses} onBack={() => setView('admin_dashboard')} />;
            case 'admin_schools':
                return <StudentsBySchoolPage schools={schools} students={students} onBack={() => setView('admin_dashboard')} onNavigateToAddSchool={() => setView('admin_add_school')} onNavigateToEditSchool={(s) => { setSelectedSchool(s); setView('admin_edit_school'); }} />;
            case 'admin_add_school':
                return <AddSchoolPage onAddSchool={handleAddSchool} onCancel={() => setView('admin_schools')} />;
            case 'admin_edit_school':
                if (!selectedSchool) return <div>Error: No school selected.</div>;
                return <EditSchoolPage school={selectedSchool} onEditSchool={handleEditSchool} onCancel={() => setView('admin_schools')} />;

            case 'instructor_dashboard':
                return <InstructorDashboard 
                  user={mockInstructorUser}
                  instructorDetails={instructors.find(i => i.id === mockInstructorUser.id)!}
                  upcomingSessions={upcomingSessions}
                  assignments={assignments}
                  students={students}
                  onScheduleSession={handleScheduleSession}
                  onAddAssignment={handleAddAssignment}
                  onEditAssignment={handleEditAssignment}
                  onDeleteAssignment={handleDeleteAssignment}
                  onGradeAssignment={handleGradeAssignment}
                  onStartLiveSession={() => setView('instructor_live_session')}
                  onViewStudent={(student) => { setSelectedStudent(student); setView('student_dashboard'); }}
                />;
            case 'instructor_live_session':
                return <LiveSessionPage students={students} onEndSession={() => setView('instructor_dashboard')} />;

            default: return <div>Not Found</div>;
        }
    };
    
    return (
        <div className="bg-neutral-100 min-h-screen font-sans">
            {user && <Header user={user} onLogout={handleLogout} />}
            <main className={user ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""}>
                {renderContent()}
            </main>
        </div>
    );
};

export default App;