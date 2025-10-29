import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, onClick }) => {
  const commonClasses = "w-full text-left bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4";
  const interactiveClasses = "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer";

  const content = (
    <>
      <div className="flex-shrink-0 bg-primary-light p-4 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-base text-neutral-500 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-neutral-800">{value}</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${commonClasses} ${interactiveClasses}`}>
        {content}
      </button>
    );
  }

  return (
    <div className={commonClasses}>
      {content}
    </div>
  );
};