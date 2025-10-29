import React from 'react';
import type { Instructor } from '../../types';
import { UserCircleIcon } from '../icons';

interface InstructorListProps {
  instructors: Instructor[];
  onNavigateToAddInstructor: () => void;
  onViewInstructor: (instructor: Instructor) => void;
}

export const InstructorList: React.FC<InstructorListProps> = ({ instructors, onNavigateToAddInstructor, onViewInstructor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-800">Instructors</h2>
        <button
          onClick={onNavigateToAddInstructor}
          className="text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Add Instructor
        </button>
      </div>
      <div className="space-y-3">
        {instructors.map((instructor) => (
          <button 
            key={instructor.id} 
            onClick={() => onViewInstructor(instructor)}
            className="w-full flex items-center justify-between p-3 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`View profile for ${instructor.name}`}
          >
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="w-10 h-10 text-neutral-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-neutral-800">{instructor.name}</p>
                <p className="text-base text-neutral-500">{instructor.email}</p>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-sm text-neutral-500 font-semibold">COURSES</p>
              <p className="text-base font-medium text-neutral-800">{instructor.courses.join(', ')}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};