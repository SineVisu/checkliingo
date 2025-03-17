
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, X, FileCheck } from 'lucide-react';

interface CompletionDialogActionsProps {
  hasPaid: boolean;
  isGeneratingPDF: boolean;
  onGenerate: () => void;
  onDownload: () => void;
  onNotify: () => void;
  onSkip: () => void;
}

const CompletionDialogActions: React.FC<CompletionDialogActionsProps> = ({
  hasPaid,
  isGeneratingPDF,
  onGenerate,
  onDownload,
  onNotify,
  onSkip
}) => {
  return (
    <div className="flex flex-col gap-3">
      {!hasPaid ? (
        <Button 
          onClick={onGenerate} 
          className="w-full bg-green-600 hover:bg-green-700 gap-2"
          disabled={isGeneratingPDF}
        >
          <FileCheck className="h-4 w-4" />
          {isGeneratingPDF ? "Generating your PDF..." : "Generate my certified PDF ($9.99)"}
        </Button>
      ) : (
        <>
          <Button 
            onClick={onDownload} 
            className="w-full bg-green-600 hover:bg-green-700 gap-2"
            disabled={isGeneratingPDF}
          >
            <Download className="h-4 w-4" />
            {isGeneratingPDF ? "Generating PDF..." : "Download PDF Again"}
          </Button>
          <Button 
            onClick={onNotify} 
            className="w-full gap-2"
          >
            <Mail className="h-4 w-4" />
            I want to notify my DPE I am eligible
          </Button>
          <Button 
            variant="outline" 
            onClick={onSkip} 
            className="w-full gap-2"
          >
            <X className="h-4 w-4" />
            I don't want to notify my DPE
          </Button>
        </>
      )}
    </div>
  );
};

export default CompletionDialogActions;
