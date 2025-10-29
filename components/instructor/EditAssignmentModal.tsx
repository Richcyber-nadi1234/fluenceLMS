import React, { useState, useEffect } from 'react';
import type { Assignment } from '../../types';
import { XMarkIcon, PencilIcon } from '../icons';

interface EditAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (assignmentId: number, assignmentData: { title: string; description: string; dueDate: string; course: string; }) => void;
  assignment: Assignment | null;
  courses: string[];
}

export const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({ isOpen, onClose, onEdit, assignment, courses }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description || '');
      // Format date for input[type="date"] which requires YYYY-MM-DD
      setDueDate(new Date(assignment.dueDate).toISOString().split('T')[0]);
      setSelectedCourse(assignment.course || '');
    }
  }, [assignment]);


  if (!isOpen || !assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        onEdit(assignment.id, { title, description, dueDate, course: selectedCourse });
        setIsSaving(false);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-primary-light p-2.5 rounded-full">
                    <PencilIcon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-neutral-800">Edit Assignment</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="edit-title" className="block text-base font-medium text-neutral-700">Title</label>
                <input id="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
            <div>
                <label htmlFor="edit-course" className="block text-base font-medium text-neutral-700">Course</label>
                <select 
                    id="edit-course" 
                    value={selectedCourse} 
                    onChange={(e) => setSelectedCourse(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                >
                    {courses.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="edit-description" className="block text-base font-medium text-neutral-700">Description</label>
                <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"></textarea>
            </div>
            <div>
                <label htmlFor="edit-due-date" className="block text-base font-medium text-neutral-700">Due Date</label>
                <input id="edit-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 text-base font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200">Cancel</button>
                <button type="submit" disabled={isSaving || !title || !dueDate || !selectedCourse} className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};