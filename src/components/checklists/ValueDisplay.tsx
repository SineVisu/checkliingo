
import React from 'react';
import { format } from 'date-fns';
import { BookOpen } from 'lucide-react';

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
  
  // Handle string value that represents a logbook page number for experience tasks
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return (
      <span className="flex items-center">
        <BookOpen className="h-3 w-3 mr-1 text-gray-500" />
        <span>Logbook Page: {value}</span>
      </span>
    );
  }
  
  return <span>{value.toString()}</span>;
};

export default ValueDisplay;
