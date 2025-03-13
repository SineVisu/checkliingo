
import React from 'react';
import { Loader2 } from "lucide-react";

interface ProcessingIndicatorProps {
  message?: string;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ 
  message = "Processing..." 
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default ProcessingIndicator;
