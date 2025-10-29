import React, { useState } from 'react';
import type { User, UpcomingSession, Assignment, DashboardStudent, Instructor } from '../../types';
import { CalendarDaysIcon, ClipboardListIcon, EyeIcon, PencilIcon, TrashIcon, UserCircleIcon, UsersIcon, VideoCameraIcon } from '../icons';
import { ScheduleClassModal } from './ScheduleClassModal';
import { AddAssignmentModal } from './AddAssignmentModal';
import { EditAssignmentModal } from './EditAssignmentModal';
import { GradeForm } from './GradeForm';

interface InstructorDashboardProps {
  user: User & { role: 'instructor' };
  instructorDetails: Instructor;
  upcomingSessions: UpcomingSession[];
  assignments: Assignment[];
  students: DashboardStudent[];
  onScheduleSession: (session: Omit<UpcomingSession, 'id'|'students'>) => void;
  onAddAssignment: (assignmentData: { title: string; description: string; dueDate: string; course: string; }) => void;
  onEditAssignment: (assignmentId: number, assignmentData: { title: string; description: string; dueDate: string; course: string; }) => void;
  onDeleteAssignment: (assignmentId: number) => void;
  onGradeAssignment: (assignmentId: number, score: number, feedback: string) => void;
  onStartLiveSession: () => void;
  onViewStudent: (student: DashboardStudent) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  user,
  instructorDetails,
  upcomingSessions,
  assignments,
  students,
  onScheduleSession,
  onAddAssignment,
  onEditAssignment,
  onDeleteAssignment,
  onGradeAssignment,
  onStartLiveSession,
  onViewStudent,
}) => {
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [isAddAssignmentModalOpen, setAddAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const assignmentsToGrade = assignments.filter(a => a.status === 'Submitted');
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-neutral-800">Welcome, {user.name}!</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2"><CalendarDaysIcon className="w-6 h-6 text-primary" /> Upcoming Classes</h2>
              <button onClick={() => setScheduleModalOpen(true)} className="text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Schedule Class</button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.slice(0, 3).map(session => (
                <div key={session.id} className="p-3 bg-neutral-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-neutral-800">{session.course}</p>
                    <p className="text-base text-neutral-500">{new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {session.time}</p>
                  </div>
                  <button onClick={onStartLiveSession} className="text-base font-semibold text-white bg-accent py-2 px-4 rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-2">
                    <VideoCameraIcon className="w-5 h-5" /> Start Session
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments to Grade */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2"><ClipboardListIcon className="w-6 h-6 text-accent" /> Assignments to Grade</h2>
              <button onClick={() => setAddAssignmentModalOpen(true)} className="text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Add Assignment</button>
            </div>
             <div className="space-y-3">
               {assignmentsToGrade.map(assignment => (
                 <div key={assignment.id} className="p-4 bg-neutral-100 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-neutral-800">{assignment.title}</p>
                            <p className="text-base text-neutral-500">{students.find(s => s.id === assignment.studentId)?.name} - {assignment.course}</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <button onClick={() => setEditingAssignment(assignment)} className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-200 rounded-full"><PencilIcon className="w-5 h-5"/></button>
                            <button onClick={() => onDeleteAssignment(assignment.id)} className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-100 rounded-full"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                   <GradeForm assignment={assignment} onGrade={onGradeAssignment} />
                 </div>
               ))}
               {assignmentsToGrade.length === 0 && <p className="text-neutral-500 text-center py-4">No assignments to grade. Great job!</p>}
             </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Students */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2"><UsersIcon className="w-6 h-6 text-primary" /> My Students</h2>
            <div className="space-y-3">
              {students.map(student => (
                <div key={student.id} className="flex items-center justify-between p-2 bg-neutral-100 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                    <p className="font-semibold text-neutral-800">{student.name}</p>
                  </div>
                  <button onClick={() => onViewStudent(student)} className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-200 rounded-full">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ScheduleClassModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSchedule={onScheduleSession}
      />
      <AddAssignmentModal
        isOpen={isAddAssignmentModalOpen}
        onClose={() => setAddAssignmentModalOpen(false)}
        onAdd={onAddAssignment}
        courses={instructorDetails.courses}
      />
      <EditAssignmentModal
        isOpen={!!editingAssignment}
        onClose={() => setEditingAssignment(null)}
        onEdit={onEditAssignment}
        assignment={editingAssignment}
        courses={instructorDetails.courses}
      />
    </div>
  );
};