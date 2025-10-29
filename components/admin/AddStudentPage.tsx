import React, { useState } from 'react';
import type { School, DashboardStudent } from '../../types';
import { ArrowLeftIcon, UserPlusIcon } from '../icons';

interface AddStudentPageProps {
  schools: School[];
  onAddStudent: (studentData: Omit<DashboardStudent, 'id'>) => void;
  onCancel: () => void;
}

export const AddStudentPage: React.FC<AddStudentPageProps> = ({ schools, onAddStudent, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolId, setSchoolId] = useState<number>(schools[0]?.id || 0);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) {
      alert("Please select a school.");
      return;
    }
    setIsSaving(true);
    
    setTimeout(() => {
      onAddStudent({
        name,
        email,
        schoolId,
        // Mock data for new student
        overallScore: 0,
        attendance: 100,
        assignmentsCompleted: 0,
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
          Back to Students
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b">
           <div className="flex items-center gap-3">
              <div className="bg-primary-light p-3 rounded-full">
                  <UserPlusIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-800">Add New Student</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-base font-medium text-neutral-700">Full Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., Kwame Mensah" />
            </div>
             <div>
                <label htmlFor="email" className="block text-base font-medium text-neutral-700">Email Address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., kwame.m@example.com" />
            </div>
             <div>
                <label htmlFor="school" className="block text-base font-medium text-neutral-700">School</label>
                <select 
                    id="school" 
                    value={schoolId} 
                    onChange={(e) => setSchoolId(Number(e.target.value))} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                >
                    <option value="" disabled>Select a school</option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
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
                    disabled={isSaving || !name || !email || !schoolId}
                    className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50"
                >
                    {isSaving ? 'Adding...' : 'Add Student'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
