
import React from 'react';

export const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16.5c2.57 0 4.98.655 7.02 1.767m-14.04 0A13.937 13.937 0 0112 16.5c-2.57 0-4.98.655-7.02 1.767m14.04 0A13.936 13.936 0 0012 21c-2.57 0-4.98-.655-7.02-1.767m14.04 0A13.937 13.937 0 0112 16.5c-2.57 0-4.98.655-7.02 1.767M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
