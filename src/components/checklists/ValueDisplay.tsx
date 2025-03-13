
import React from 'react';
import { format } from 'date-fns';

interface ValueDisplayProps {
  value: any;
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({ value }) => {
  if (!value) return null;
  
  if (value instanceof Date) {
    return <span>{format(value, 'MMMM d, yyyy')}</span>;
  } 
  
  if (typeof value === 'object' && value.date) {
    return (
      <>
        <span>Date: {format(value.date, 'MMMM d, yyyy')}</span>
        {value.hours && <span className="ml-2">Hours: {value.hours}</span>}
        {value.pageNumber && <span className="ml-2">Page: {value.pageNumber}</span>}
      </>
    );
  }
  
  return <span>{value.toString()}</span>;
};

export default ValueDisplay;
