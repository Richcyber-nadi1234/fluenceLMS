import React from 'react';
import { ArrowLeftIcon, BookOpenIcon, PlusCircleIcon } from '../icons';

interface CourseListPageProps {
  courses: string[];
  onBack: () => void;
}

export const CourseListPage: React.FC<CourseListPageProps> = ({ courses, onBack }) => {
  const uniqueCourses = [...new Set(courses)];

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

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-light p-3 rounded-full">
                <BookOpenIcon className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800">All Courses</h1>
          </div>
          <button
            className="flex items-center gap-2 text-base font-semibold text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            disabled // Not implementing add course functionality now
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Course
          </button>
        </div>
        <div className="space-y-3">
          {uniqueCourses.length > 0 ? (
            uniqueCourses.map((course, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between p-4 bg-neutral-100 rounded-xl"
              >
                <p className="font-bold text-neutral-800">{course}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral-500 py-8">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};