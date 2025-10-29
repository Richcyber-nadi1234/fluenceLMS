import React from 'react';
import type { DashboardStudent, Instructor } from '../../types';
import { StatCard } from './StatCard';
import { InstructorList } from './InstructorList';
import { UsersIcon, AcademicCapIcon, BuildingLibraryIcon, UserCircleIcon, EyeIcon } from '../icons';

interface AdminDashboardProps {
  stats: {
    totalStudents: number;
    totalInstructors: number;
    schools: number;
  };
  instructors: Instructor[];
  students: DashboardStudent[];
  onNavigateToStudents: () => void;
  onNavigateToInstructors: () => void;
  onNavigateToSchools: () => void;
  onViewInstructor: (instructor: Instructor) => void;
  onNavigateToAddInstructor: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  instructors,
  students,
  onNavigateToStudents,
  onNavigateToInstructors,
  onNavigateToSchools,
  onViewInstructor,
  onNavigateToAddInstructor,
}) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Students" 
          value={String(stats.totalStudents)} 
          icon={<UsersIcon className="w-8 h-8 text-primary" />}
          onClick={onNavigateToStudents}
        />
        <StatCard 
          title="Total Instructors" 
          value={String(stats.totalInstructors)} 
          icon={<AcademicCapIcon className="w-8 h-8 text-primary" />}
          onClick={onNavigateToInstructors}
        />
        <StatCard 
          title="Partner Schools" 
          value={String(stats.schools)} 
          icon={<BuildingLibraryIcon className="w-8 h-8 text-primary" />}
          onClick={onNavigateToSchools}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instructors List */}
        <InstructorList 
          instructors={instructors.slice(0, 5)} // Show recent 5
          onNavigateToAddInstructor={onNavigateToAddInstructor}
          onViewInstructor={onViewInstructor}
        />

        {/* Recent Students List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">Recent Students</h2>
            <button
              onClick={onNavigateToStudents}
              className="text-base font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {students.slice(0, 5).map((student) => (
              <div 
                key={student.id} 
                className="w-full flex items-center justify-between p-3 bg-neutral-100 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <UserCircleIcon className="w-10 h-10 text-neutral-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-neutral-800">{student.name}</p>
                    <p className="text-base text-neutral-500">{student.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500 font-semibold">SCORE</p>
                  <p className="text-base font-medium text-neutral-800">{student.overallScore}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
