
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NameDiscrepancyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  licenseName?: string;
  medicalName?: string;
}

const NameDiscrepancyDialog: React.FC<NameDiscrepancyDialogProps> = ({ 
  isOpen, 
  onClose,
  licenseName,
  medicalName
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Name Discrepancy Detected
          </DialogTitle>
          <DialogDescription>
            There is a discrepancy between your pilot license and medical certificate names.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">License Name:</h3>
              <p className="font-medium">{licenseName || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Medical Name:</h3>
              <p className="font-medium">{medicalName || 'Not provided'}</p>
            </div>
          </div>
          
          <div className="border-l-4 border-destructive bg-destructive/10 p-4">
            <p className="text-sm">
              Please contact your local FSDO to resolve this discrepancy. Flyber Checklist Complete cannot certify that you are eligible for your checkride without this issue resolved.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>
            Understand, I'll Resolve This
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NameDiscrepancyDialog;
