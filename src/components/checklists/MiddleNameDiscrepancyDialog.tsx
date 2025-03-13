
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MiddleNameDiscrepancyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  licenseName?: string;
  medicalName?: string;
  onAcknowledge: () => void;
}

const MiddleNameDiscrepancyDialog: React.FC<MiddleNameDiscrepancyDialogProps> = ({ 
  isOpen, 
  onClose,
  licenseName,
  medicalName,
  onAcknowledge
}) => {
  const [acknowledged, setAcknowledged] = useState(false);
  
  const handleAcknowledge = () => {
    if (acknowledged) {
      onAcknowledge();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Middle Name Discrepancy Detected
          </DialogTitle>
          <DialogDescription>
            Your Pilot Certificate has a middle name that is missing on your Medical Certificate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Certificate Name:</h3>
              <p className="font-medium">{licenseName || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Medical Name:</h3>
              <p className="font-medium">{medicalName || 'Not provided'}</p>
            </div>
          </div>
          
          <div className="border-l-4 border-amber-500 bg-amber-50 p-4">
            <p className="text-sm">
              Please email 9-ANM-300-FAX@faa.gov. Attach the PDF of the current Medical Certificate, and ID (driver license), front and back side. Expect the FAA to email you in 24 to 48 hours with an updated certificate.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="acknowledge" 
              checked={acknowledged} 
              onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
            />
            <Label htmlFor="acknowledge" className="text-sm">
              I understand this discrepancy and will take appropriate action
            </Label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAcknowledge}
            disabled={!acknowledged}
          >
            Acknowledge and Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MiddleNameDiscrepancyDialog;
