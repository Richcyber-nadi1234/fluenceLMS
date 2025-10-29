import React, { useState } from 'react';
import type { Instructor } from '../../types';
import { ArrowLeftIcon, BookOpenIcon } from '../icons';

interface AddClassPageProps {
  instructor: Instructor;
  onAssignCourse: (courseName: string) => void;
  onCancel: () => void;
}

export const AddClassPage: React.FC<AddClassPageProps> = ({ instructor, onAssignCourse, onCancel }) => {
  const [courseName, setCourseName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onAssignCourse(courseName);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-base font-semibold text-neutral-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
         <div className="p-6 border-b">
           <div className="flex items-center gap-3">
              <div className="bg-primary-light p-3 rounded-full">
                  <BookOpenIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Assign New Class</h1>
                <p className="text-neutral-500">To: {instructor.name}</p>
              </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="courseName" className="block text-base font-medium text-neutral-700">
              Course Name
            </label>
            <input
              id="courseName"
              type="text"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
              placeholder="e.g., Introduction to JavaScript"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-base font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !courseName}
              className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50"
            >
              {isSaving ? 'Assigning...' : 'Assign Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
