
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Mail, X, FileCheck } from 'lucide-react';
import { ChecklistContext } from '@/context/ChecklistContext';
import { toast } from 'sonner';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasPaid, setHasPaid] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { checklists } = useContext(ChecklistContext);
  
  const handleGeneratePDF = () => {
    // In a real implementation, this would trigger Apple Pay
    // For now, we'll simulate a successful payment
    setTimeout(() => {
      setHasPaid(true);
      // Send email automatically after payment
      sendCompletionEmail();
    }, 1000);
  };
  
  const sendCompletionEmail = async () => {
    setIsSendingEmail(true);
    
    try {
      // Get profile data from localStorage
      const profileData = localStorage.getItem('userProfile') 
        ? JSON.parse(localStorage.getItem('userProfile') || '{}') 
        : {};
      
      // Format checklist data
      const checklistData = checklists.map(group => ({
        title: group.title,
        items: group.items.map(item => ({
          title: item.title,
          completed: item.isCompleted,
          value: item.value || 'N/A'
        }))
      }));
      
      // Create email content
      const emailData = {
        to: 'info@flyber.co',
        subject: 'Checklist Completed',
        content: {
          profile: profileData,
          checklist: checklistData
        }
      };
      
      // In a real implementation, this would send the email via an API
      // For now, we'll simulate sending by logging and showing a success message
      console.log("Sending email with data:", emailData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Completion email sent!", {
        description: "Your checklist and profile data have been sent to Flyber.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send completion email", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSendingEmail(false);
    }
  };
  
  const handleNotifyDPE = () => {
    // In a real implementation, this would handle the DPE notification
    sendCompletionEmail();
    onClose();
  };
  
  const handleSkipNotification = () => {
    // Send email anyway but close the dialog
    sendCompletionEmail();
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
            <Button 
              onClick={handleGeneratePDF} 
              className="w-full bg-green-600 hover:bg-green-700 gap-2"
              disabled={isSendingEmail}
            >
              <FileCheck className="h-4 w-4" />
              Generate my certified PDF ($9.99)
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleNotifyDPE} 
                className="w-full gap-2"
                disabled={isSendingEmail}
              >
                <Mail className="h-4 w-4" />
                {isSendingEmail ? "Sending email..." : "I want to notify my DPE I am eligible"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkipNotification} 
                className="w-full gap-2"
                disabled={isSendingEmail}
              >
                <X className="h-4 w-4" />
                {isSendingEmail ? "Sending email..." : "I don't want to notify my DPE"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
