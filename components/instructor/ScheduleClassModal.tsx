import React, { useState } from 'react';
import type { UpcomingSession } from '../../types';
import { XMarkIcon, CalendarDaysIcon } from '../icons';

interface ScheduleClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (session: Omit<UpcomingSession, 'id'|'students'>) => void;
}

export const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ isOpen, onClose, onSchedule }) => {
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        onSchedule({ course, date, time });
        setIsSaving(false);
        onClose();
        // Reset form
        setCourse('');
        setDate('');
        setTime('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-primary-light p-2.5 rounded-full">
                    <CalendarDaysIcon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-neutral-800">Schedule New Class</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="course-name" className="block text-base font-medium text-neutral-700">Course Name</label>
                <input
                    id="course-name"
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                    placeholder="e.g., Python for Beginners"
                    required
                />
            </div>
             <div>
                <label htmlFor="date" className="block text-base font-medium text-neutral-700">Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                    required
                />
            </div>
             <div>
                <label htmlFor="time" className="block text-base font-medium text-neutral-700">Time</label>
                <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                    required
                />
            </div>
            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-base font-medium text-neutral-700 bg-neutral-100 border border-transparent rounded-lg hover:bg-neutral-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving || !course || !date || !time}
                    className="px-4 py-2 text-base font-semibold text-white bg-primary border border-transparent rounded-lg shadow-sm hover:bg-primary-dark disabled:bg-primary/50"
                >
                    {isSaving ? 'Scheduling...' : 'Schedule Class'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};