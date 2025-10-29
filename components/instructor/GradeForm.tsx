import React, { useState } from 'react';
import type { Assignment } from '../../types';

interface GradeFormProps {
  assignment: Assignment;
  onGrade: (assignmentId: number, score: number, feedback: string) => void;
}

export const GradeForm: React.FC<GradeFormProps> = ({ assignment, onGrade }) => {
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = parseInt(score, 10);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      // Basic validation
      alert('Please enter a valid score between 0 and 100.');
      return;
    }
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        onGrade(assignment.id, numericScore, feedback);
        setIsSaving(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleGrade} className="p-4 mt-4 border-t space-y-3">
      <div>
        <label htmlFor={`score-${assignment.id}`} className="block text-base font-medium text-neutral-700">
          Score (0-100)
        </label>
        <input
          id={`score-${assignment.id}`}
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="mt-1 block w-full px-3 py-1.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
          placeholder="e.g., 95"
          min="0"
          max="100"
          required
        />
      </div>
      <div>
        <label htmlFor={`feedback-${assignment.id}`} className="block text-base font-medium text-neutral-700">
          Feedback
        </label>
        <textarea
          id={`feedback-${assignment.id}`}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={2}
          className="mt-1 block w-full px-3 py-1.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
          placeholder="Provide constructive feedback..."
        ></textarea>
      </div>
      <div className="text-right">
        <button
          type="submit"
          disabled={isSaving || !score}
          className="text-base font-semibold text-white bg-primary hover:bg-primary-dark py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Grade'}
        </button>
      </div>
    </form>
  );
};