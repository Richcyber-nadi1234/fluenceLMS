import React from 'react';
import type { Instructor } from '../../types';
import { ArrowLeftIcon, AcademicCapIcon } from '../icons';
import { InstructorList } from './InstructorList';

interface InstructorListPageProps {
  instructors: Instructor[];
  onBack: () => void;
  onNavigateToAddInstructor: () => void;
  onViewInstructor: (instructor: Instructor) => void;
}

export const InstructorListPage: React.FC<InstructorListPageProps> = ({
  instructors,
  onBack,
  onNavigateToAddInstructor,
  onViewInstructor
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-light p-3 rounded-full">
            <AcademicCapIcon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800">All Instructors</h1>
      </div>

      <InstructorList 
        instructors={instructors}
        onNavigateToAddInstructor={onNavigateToAddInstructor}
        onViewInstructor={onViewInstructor}
      />
    </div>
  );
};