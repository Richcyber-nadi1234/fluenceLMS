import React from 'react';

export const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10.5 6a7.5 7.5 0 100 12h-3a7.5 7.5 0 00-7.5-7.5V10.5A7.5 7.5 0 0010.5 6z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" 
    />
  </svg>
);