
import React from 'react';

const IdentificationAchievementIcon: React.FC = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bronze pilot wings */}
      <path 
        d="M24 8C18 8 12 12 6 14C6 22 8 34 24 40C40 34 42 22 42 14C36 12 30 8 24 8Z" 
        fill="#CD7F32" 
        stroke="#996633" 
        strokeWidth="2"
      />
      <path 
        d="M24 14C28 14 30 16 30 19C30 21 28 24 24 24C20 24 18 21 18 19C18 16 20 14 24 14Z" 
        fill="#996633" 
        stroke="#996633" 
        strokeWidth="1"
      />
      <path 
        d="M12 14L36 14" 
        stroke="#996633" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M15 18L33 18" 
        stroke="#996633" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IdentificationAchievementIcon;
