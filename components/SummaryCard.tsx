import React from 'react';

type Status = 'success' | 'warning' | 'danger';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status?: Status;
  statusText?: string;
}

const statusStyles: Record<Status, { border: string; text: string; }> = {
    success: {
        border: 'border-l-4 border-green-500',
        text: 'text-green-600'
    },
    warning: {
        border: 'border-l-4 border-yellow-500',
        text: 'text-yellow-600'
    },
    danger: {
        border: 'border-l-4 border-red-500',
        text: 'text-red-600'
    },
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, status, statusText }) => {
  const baseClasses = "bg-neutral-100 p-4 rounded-xl flex items-center space-x-4";
  const borderClass = status ? statusStyles[status].border : '';
  const statusTextColor = status ? statusStyles[status].text : '';
  
  return (
    <div className={`${baseClasses} ${borderClass}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-base text-neutral-500">{title}</p>
        <p className="text-2xl font-bold text-neutral-800">{value}</p>
        {statusText && <p className={`text-sm font-semibold ${statusTextColor}`}>{statusText}</p>}
      </div>
    </div>
  );
};
