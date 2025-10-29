import React, { useState } from 'react';
import { XMarkIcon, DocumentPlusIcon } from '../icons';

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (assignmentData: { title: string; description: string; dueDate: string; course: string; }) => void;
  courses: string[];
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ isOpen, onClose, onAdd, courses }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        onAdd({ title, description, dueDate, course: selectedCourse });
        setIsSaving(false);
        onClose();
        // Reset form
        setTitle('');
        setDescription('');
        setDueDate('');
        setSelectedCourse(courses[0] || '');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-primary-light p-2.5 rounded-full">
                    <DocumentPlusIcon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-neutral-800">Add New Assignment</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="title" className="block text-base font-medium text-neutral-700">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="e.g., Final Project Proposal" />
            </div>
            <div>
                <label htmlFor="course" className="block text-base font-medium text-neutral-700">Course</label>
                <select 
                    id="course" 
                    value={selectedCourse} 
                    onChange={(e) => setSelectedCourse(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                >
                    {courses.map(course => <option key={course} value={course}>{course}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="description" className="block text-base font-medium text-neutral-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" placeholder="Provide instructions for the assignment..."></textarea>
            </div>
            <div>
                <label htmlFor="due-date" className="block text-base font-medium text-neutral-700">Due Date</label>
                <input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-base" />
            </div>
            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 text-base font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200">Cancel</button>
                <button type="submit" disabled={isSaving || !title || !dueDate || !selectedCourse} className="px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50">
                    {isSaving ? 'Adding...' : `Add Assignment`}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};