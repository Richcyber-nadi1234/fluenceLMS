import React, { useState } from 'react';
import type { Instructor } from '../../types';
import { ArrowLeftIcon, UserPlusIcon } from '../icons';

interface AddInstructorPageProps {
  onAddInstructor: (instructorData: Omit<Instructor, 'id'>) => void;
  onCancel: () => void;
}

export const AddInstructorPage: React.FC<AddInstructorPageProps> = ({ onAddInstructor, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const coursesArray = courses.split(',').map(c => c.trim()).filter(Boolean);
    
    // Simulate API call
    setTimeout(() => {
      onAddInstructor({
        name,
        email,
        courses: coursesArray,
      });
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
          Back to Instructors
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b">
           <div className="flex items-center gap-3">
              <div className="bg-primary-light p-3 rounded-full">
                  <UserPlusIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-800">Add New Instructor</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-base font-medium text-neutral-700">Full Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., Aisha Mensah" />
            </div>
             <div>
                <label htmlFor="email" className="block text-base font-medium text-neutral-700">Email Address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., a.mensah@fluence.edu" />
            </div>
             <div>
                <label htmlFor="courses" className="block text-base font-medium text-neutral-700">Courses</label>
                <input id="courses" type="text" value={courses} onChange={(e) => setCourses(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., Python Basics, Web Dev (comma-separated)" />
                 <p className="mt-1 text-sm text-neutral-500">Separate course names with a comma.</p>
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
                    disabled={isSaving || !name || !email}
                    className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50"
                >
                    {isSaving ? 'Adding...' : 'Add Instructor'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
