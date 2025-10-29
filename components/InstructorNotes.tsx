import React from 'react';
import type { InstructorNote } from '../types';
import { UserCircleIcon } from './icons';

interface InstructorNotesProps {
  notes: InstructorNote[];
}

export const InstructorNotes: React.FC<InstructorNotesProps> = ({ notes }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800">Recent Instructor Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-neutral-100 rounded-xl">
            <div className="flex items-start space-x-3">
              <UserCircleIcon className="w-8 h-8 text-neutral-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-neutral-800">{note.instructorName}</p>
                  <p className="text-sm text-neutral-500">{new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <p className="text-base text-neutral-600 mt-1">{note.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};