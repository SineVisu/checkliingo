
import React from 'react';

interface ExtractedMedicalInfoProps {
  extractedData: {
    name: string | null;
    date: Date | null;
  };
}

const ExtractedMedicalInfo: React.FC<ExtractedMedicalInfoProps> = ({ extractedData }) => {
  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-sm font-medium">Extracted Information:</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-medium">{extractedData.name || 'Not detected'}</span>
        </div>
      </div>
    </div>
  );
};

export default ExtractedMedicalInfo;
