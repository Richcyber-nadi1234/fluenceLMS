import React, { useState } from 'react';
import type { Assignment } from '../types';
import { ArrowLeftIcon, ChevronDownIcon, ClockIcon, PaperClipIcon, BellIcon, CheckCircleIcon } from './icons';

interface StudentAssignmentPageProps {
  assignments: Assignment[];
  onBack: () => void;
  onAssignmentSubmit: (id: number) => void;
  onSetReminder: (id: number) => void;
}

const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Submitted': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Overdue': return 'bg-red-100 text-red-800';
        default: return 'bg-neutral-100 text-neutral-800';
    }
}

export const StudentAssignmentPage: React.FC<StudentAssignmentPageProps> = ({ assignments, onBack, onAssignmentSubmit, onSetReminder }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedAssignments = [...assignments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

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
        <h1 className="text-3xl font-bold text-neutral-800 mb-6">My Assignments</h1>
        <div className="space-y-3">
          {sortedAssignments.map(assignment => (
            <div key={assignment.id} className="bg-neutral-100 rounded-xl overflow-hidden">
              <button onClick={() => toggleExpand(assignment.id)} className="w-full text-left p-4 flex items-center justify-between hover:bg-neutral-200/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-lg text-neutral-800">{assignment.title}</p>
                    <span className={`px-2 py-0.5 text-sm font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <p className="text-base text-neutral-500">{assignment.course} - Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-neutral-500 transition-transform ${expandedId === assignment.id ? 'rotate-180' : ''}`} />
              </button>
              {expandedId === assignment.id && (
                <div className="p-4 border-t border-neutral-200 space-y-4">
                  {assignment.description && <p className="text-neutral-600">{assignment.description}</p>}
                  
                  {assignment.resources && assignment.resources.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-700 mb-2">Resources</h4>
                      <ul className="space-y-1">
                        {assignment.resources.map(res => (
                          <li key={res.name}>
                            <a href={res.url} className="flex items-center gap-2 text-primary hover:underline">
                              <PaperClipIcon className="w-5 h-5" /> {res.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {assignment.feedback && (
                     <div>
                      <h4 className="font-semibold text-neutral-700 mb-1">Feedback from {assignment.feedback.instructorName}</h4>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-neutral-600">{assignment.feedback.comment}</p>
                        {assignment.score && <p className="font-bold mt-2">Score: {assignment.score}/100</p>}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {assignment.status === 'Pending' && (
                        <>
                            <button onClick={() => onAssignmentSubmit(assignment.id)} className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Submit Assignment</button>
                             <button 
                                onClick={() => onSetReminder(assignment.id)} 
                                disabled={assignment.reminderSet}
                                className="flex-1 flex items-center justify-center gap-2 bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-accent-dark transition-colors disabled:bg-accent/50 disabled:cursor-not-allowed">
                                {assignment.reminderSet ? <><CheckCircleIcon className="w-5 h-5"/> Reminder Set</> : <><BellIcon className="w-5 h-5" /> Set Reminder</>}
                            </button>
                        </>
                    )}
                    {assignment.status === 'Overdue' && (
                        <button onClick={() => onAssignmentSubmit(assignment.id)} className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Submit Late</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
