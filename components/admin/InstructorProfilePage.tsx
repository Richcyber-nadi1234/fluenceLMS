import React from 'react';
import type { Instructor, DashboardStudent } from '../../types';
import { ArrowLeftIcon, UserCircleIcon, BookOpenIcon, PlusCircleIcon } from '../icons';

interface InstructorProfilePageProps {
  instructor: Instructor;
  assignedStudents: DashboardStudent[];
  onBack: () => void;
  onNavigateToAddClass: () => void;
}

export const InstructorProfilePage: React.FC<InstructorProfilePageProps> = ({ instructor, assignedStudents, onBack, onNavigateToAddClass }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Instructors List
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 bg-neutral-50 border-b">
          <div className="flex items-center gap-4">
            <UserCircleIcon className="w-20 h-20 text-neutral-400" />
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">{instructor.name}</h1>
              <p className="text-lg text-neutral-500">{instructor.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Courses */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
                <BookOpenIcon className="w-6 h-6 text-primary" />
                Assigned Courses
              </h2>
              <button onClick={onNavigateToAddClass} className="flex items-center gap-2 text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                <PlusCircleIcon className="w-5 h-5" />
                Add Class
              </button>
            </div>
            {instructor.courses.length > 0 ? (
              <div className="space-y-2">
                {instructor.courses.map(course => (
                  <div key={course} className="p-3 bg-primary-light text-primary-dark font-semibold rounded-lg">
                    {course}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">No courses assigned yet.</p>
            )}
          </div>

          {/* Assigned Students */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Assigned Students ({assignedStudents.length})</h2>
            <div className="space-y-3">
              {assignedStudents.map(student => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-neutral-100 rounded-lg">
                  <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                  <div>
                    <p className="font-semibold text-neutral-800">{student.name}</p>
                    <p className="text-sm text-neutral-500">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
