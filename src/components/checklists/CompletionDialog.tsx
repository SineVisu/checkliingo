
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Mail, X, FileCheck } from 'lucide-react';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasPaid, setHasPaid] = useState(false);
  
  const handleGeneratePDF = () => {
    // In a real implementation, this would trigger Apple Pay
    // For now, we'll simulate a successful payment
    setTimeout(() => {
      setHasPaid(true);
    }, 1000);
  };
  
  const handleNotifyDPE = () => {
    // In a real implementation, this would handle the DPE notification
    onClose();
  };
  
  const handleSkipNotification = () => {
    // Close the dialog without notifying
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Congratulations!</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="bg-amber-100 p-6 rounded-full">
            <Trophy className="h-12 w-12 text-amber-500" />
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've put in so much hard work and you are now eligible for your Private Pilot Practical Test!
            </p>
            <p className="text-muted-foreground">
              Thank you for using Flyber Checklist!
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3">
          {!hasPaid ? (
            <Button onClick={handleGeneratePDF} className="w-full bg-green-600 hover:bg-green-700 gap-2">
              <FileCheck className="h-4 w-4" />
              Generate my certified PDF ($9.99)
            </Button>
          ) : (
            <>
              <Button onClick={handleNotifyDPE} className="w-full gap-2">
                <Mail className="h-4 w-4" />
                I want to notify my DPE I am eligible
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkipNotification} 
                className="w-full gap-2"
              >
                <X className="h-4 w-4" />
                I don't want to notify my DPE
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
