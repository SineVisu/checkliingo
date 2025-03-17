
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChecklistContext } from '@/context/ChecklistContext';
import { toast } from 'sonner';
import { generateChecklistPDF, downloadPDF } from '@/utils/pdfUtils';
import CongratulationsContent from './CongratulationsContent';
import CompletionDialogActions from './CompletionDialogActions';
import NotificationForm from './NotificationForm';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasPaid, setHasPaid] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const { checklists } = useContext(ChecklistContext);
  
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    
    try {
      // Generate the PDF using our utility function
      const newPdfBlob = generateChecklistPDF(checklists);
      setPdfBlob(newPdfBlob);
      
      // Download the PDF
      downloadPDF(newPdfBlob);
      
      toast.success("PDF Generated Successfully", {
        description: "Your checklist PDF has been generated and downloaded."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF", {
        description: "There was a problem creating your PDF. Please try again."
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  const handleGeneratePDF = () => {
    // In a real implementation, this would trigger Apple Pay
    // For now, we'll simulate a successful payment
    setTimeout(() => {
      setHasPaid(true);
      // Generate PDF automatically after payment
      generatePDF();
    }, 1000);
  };
  
  const handleNotifyDPE = () => {
    setShowNotificationForm(true);
  };
  
  const handleSkipNotification = () => {
    // Close the dialog
    onClose();
  };
  
  const handleDownloadPDF = () => {
    generatePDF();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Congratulations!</DialogTitle>
        </DialogHeader>

        <CongratulationsContent />

        {showNotificationForm && hasPaid ? (
          <NotificationForm 
            pdfBlob={pdfBlob}
            onCancel={() => setShowNotificationForm(false)}
          />
        ) : (
          <DialogFooter>
            <CompletionDialogActions 
              hasPaid={hasPaid}
              isGeneratingPDF={isGeneratingPDF}
              onGenerate={handleGeneratePDF}
              onDownload={handleDownloadPDF}
              onNotify={handleNotifyDPE}
              onSkip={handleSkipNotification}
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
