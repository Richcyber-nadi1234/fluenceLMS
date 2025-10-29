import React, { useState, useEffect } from 'react';
import type { DashboardStudent, School } from '../../types';
import { ArrowLeftIcon, UserPlusIcon, UsersIcon, EyeIcon, XMarkIcon, SpinnerIcon } from '../icons';

interface StudentListPageProps {
  students: DashboardStudent[];
  schools: School[];
  onBack: () => void;
  onViewStudent: (student: DashboardStudent) => void;
  onNavigateToAddStudent: () => void;
}

export const StudentListPage: React.FC<StudentListPageProps> = ({ students, schools, onBack, onViewStudent, onNavigateToAddStudent }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [displayedStudents, setDisplayedStudents] = useState<DashboardStudent[]>([]);

    useEffect(() => {
        setIsLoading(true);
        // Simulate network/filtering delay
        const timer = setTimeout(() => {
            const results = students.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedStudents(results);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, students]);

    const getSchoolName = (schoolId: number) => {
        return schools.find(s => s.id === schoolId)?.name || 'Unknown School';
    }

    const handleClearSearch = () => {
        if (window.confirm("Are you sure you want to clear the search? This will reset the student list view.")) {
            setSearchTerm('');
        }
    };
    
    const getAttendanceColor = (attendance: number) => {
        if (attendance >= 90) return 'bg-green-500';
        if (attendance >= 75) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const SkeletonLoader = () => (
        <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="w-full flex items-center justify-between p-3 bg-neutral-100 rounded-xl animate-pulse">
                    <div className="flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                    <div className="hidden sm:block text-center px-4">
                        <div className="h-3 bg-neutral-200 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-24"></div>
                    </div>
                    <div className="hidden sm:block text-center px-4">
                        <div className="h-3 bg-neutral-200 rounded w-20 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-16"></div>
                    </div>
                    <div className="hidden sm:block text-center px-4">
                        <div className="h-3 bg-neutral-200 rounded w-10 mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-12"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
                </div>
            ))}
        </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-light p-3 rounded-full">
              <UsersIcon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800">All Students ({students.length})</h1>
          </div>
          <button
            onClick={onNavigateToAddStudent}
            className="flex items-center justify-center sm:w-auto gap-2 text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <UserPlusIcon className="w-5 h-5" />
            Add Student
          </button>
        </div>

        <div className="mb-4 relative">
            <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary sm:text-base pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {isLoading ? (
                    <SpinnerIcon className="w-5 h-5 text-neutral-400 animate-spin" />
                ) : searchTerm ? (
                    <button
                        onClick={handleClearSearch}
                        className="text-neutral-400 hover:text-neutral-600"
                        aria-label="Clear search"
                        title="Clear search"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                ) : null}
            </div>
        </div>

        <div className="space-y-3">
          {isLoading && !searchTerm ? ( // Show skeleton only on initial load
            <SkeletonLoader />
          ) : displayedStudents.length > 0 ? (
            displayedStudents.map(student => (
              <div key={student.id} className="w-full flex items-center justify-between p-3 bg-neutral-100 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-neutral-800 truncate">{student.name}</p>
                  <p className="text-base text-neutral-500 truncate">{student.email}</p>
                </div>
                <div className="hidden sm:block text-center px-4">
                  <p className="text-sm text-neutral-500 font-semibold">SCHOOL</p>
                  <p className="text-base font-medium text-neutral-800">{getSchoolName(student.schoolId)}</p>
                </div>
                <div className="hidden sm:block text-center px-4">
                    <p className="text-sm text-neutral-500 font-semibold">ATTENDANCE</p>
                    <div className="flex items-center justify-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${getAttendanceColor(student.attendance)}`} title={`Attendance: ${student.attendance}%`}></span>
                        <p className="text-base font-medium text-neutral-800">{student.attendance}%</p>
                    </div>
                </div>
                <div className="hidden sm:block text-center px-4">
                  <p className="text-sm text-neutral-500 font-semibold">SCORE</p>
                  <p className="text-base font-medium text-neutral-800">{student.overallScore}%</p>
                </div>
                <button 
                  onClick={() => onViewStudent(student)}
                  className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-200 rounded-full transition-colors"
                  aria-label={`View profile for ${student.name}`}
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral-500 py-8">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
