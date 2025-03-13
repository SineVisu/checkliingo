
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface NameDiscrepancyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  licenseName?: string;
  medicalName?: string;
  onAcknowledge: () => void;
}

const NameDiscrepancyDialog: React.FC<NameDiscrepancyDialogProps> = ({ 
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
            Name Discrepancy Detected
          </DialogTitle>
          <DialogDescription>
            There is a discrepancy between your pilot certificate and medical certificate names.
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
              If the student pilot certificate or pilot certificate has incorrect pilot legal name, please go to your IACRA's user profile and correct your name there, so the application (8710) will be correct. Your DPE will make a note in IACRA about the incorrect name on the printed certificate and attach the ID.
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

export default NameDiscrepancyDialog;
