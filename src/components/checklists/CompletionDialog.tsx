
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Mail, X, FileCheck, Download } from 'lucide-react';
import { ChecklistContext } from '@/context/ChecklistContext';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { checklists } = useContext(ChecklistContext);
  
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Flyber - Private Pilot Checklist', 105, 15, { align: 'center' });
      
      // Add current date
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Generated on: ${currentDate}`, 105, 25, { align: 'center' });
      
      let yPosition = 35;
      const pageWidth = doc.internal.pageSize.width;
      
      // Process each checklist group
      checklists.forEach((group, groupIndex) => {
        // Check if we need a new page
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 15;
        }
        
        // Add group title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(group.title, 14, yPosition);
        yPosition += 8;
        
        // Prepare table data for this group
        const tableData = group.items.map(item => {
          return [
            item.title,
            item.isCompleted ? 'Completed' : 'Incomplete',
            item.value ? (
              typeof item.value === 'object' 
                ? JSON.stringify(item.value).replace(/[{}"]/g, '').replace(/,/g, ', ') 
                : item.value.toString()
            ) : 'N/A',
            '' // Instructor initials column
          ];
        });
        
        // Add the table
        autoTable(doc, {
          startY: yPosition,
          head: [['Task', 'Status', 'Value', 'Instructor Initials']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [255, 165, 0] }, // Orange header
          columnStyles: {
            0: { cellWidth: 80 }, // Task column
            1: { cellWidth: 30 }, // Status column
            2: { cellWidth: 'auto' }, // Value column
            3: { cellWidth: 30 }  // Instructor initials column
          },
          didDrawPage: (data) => {
            // Add footer
            doc.setFontSize(10);
            doc.text('Flyber Checklist - Page ' + doc.internal.getNumberOfPages(), pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
          }
        });
        
        // Update Y position after table
        yPosition = (doc as any).lastAutoTable.finalY + 15;
      });
      
      // Add signature sections at the end
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Endorsements', 14, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text('Flight Instructor Signature:', 14, yPosition);
      
      // Draw signature line
      doc.line(60, yPosition + 5, 180, yPosition + 5);
      yPosition += 15;
      
      doc.text('Instructor Certificate Number:', 14, yPosition);
      doc.line(70, yPosition + 5, 180, yPosition + 5);
      yPosition += 15;
      
      doc.text('Expiration Date:', 14, yPosition);
      doc.line(50, yPosition + 5, 120, yPosition + 5);
      
      // Save the PDF
      doc.save('flyber-pilot-checklist.pdf');
      
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
  
  const handleDownloadPDF = () => {
    generatePDF();
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
              disabled={isGeneratingPDF}
            >
              <FileCheck className="h-4 w-4" />
              {isGeneratingPDF ? "Generating your PDF..." : "Generate my certified PDF ($9.99)"}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleDownloadPDF} 
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF Again"}
              </Button>
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
