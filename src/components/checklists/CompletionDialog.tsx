
import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Mail, X, FileCheck, Download, Send } from 'lucide-react';
import { ChecklistContext } from '@/context/ChecklistContext';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationFormData {
  contactInfo: string;
  message?: string;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [hasPaid, setHasPaid] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const { checklists } = useContext(ChecklistContext);
  
  const form = useForm<NotificationFormData>({
    defaultValues: {
      contactInfo: '',
      message: 'I\'ve completed my private pilot checklist and am eligible for the practical test.'
    }
  });
  
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
            // Use a safe way to get the current page number that works across jsPDF versions
            const pageNumber = typeof doc.getNumberOfPages === 'function' 
                  ? doc.getNumberOfPages() 
                  : (doc.internal.pages ? doc.internal.pages.length - 1 : 1);
            doc.text('Flyber Checklist - Page ' + pageNumber, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
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
      
      // Save the PDF as a blob for sending
      const pdfBlob = doc.output('blob');
      setPdfBlob(pdfBlob);
      
      // Also save/download the PDF directly
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
  
  const sendNotification = async (data: NotificationFormData) => {
    setIsSendingEmail(true);
    
    try {
      const contactInfo = data.contactInfo;
      const message = data.message || '';
      
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
      
      // Determine if it's an email or phone
      const isEmail = contactInfo.includes('@');
      
      // Create notification content
      const notificationData = {
        to: isEmail ? contactInfo : 'sms:' + contactInfo, // Format for SMS if it's a phone number
        subject: 'Pilot Checklist Completion Notification',
        content: {
          profile: profileData,
          checklist: checklistData,
          message: message
        },
        pdfAttachment: pdfBlob ? true : false
      };
      
      // In a real implementation, this would send the email/SMS via an API
      // For now, we'll simulate sending by logging and showing a success message
      console.log("Sending notification with data:", notificationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Notification sent to ${isEmail ? 'email' : 'phone'}!`, {
        description: `Your checklist data has been sent to ${contactInfo}.`,
      });
      
      // Reset form and hide it
      setShowNotificationForm(false);
      form.reset();
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSendingEmail(false);
    }
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

        {showNotificationForm && hasPaid ? (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium text-center">Notify your DPE</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(sendNotification)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter DPE email or phone number" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add a personal message" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col gap-2">
                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isSendingEmail}
                  >
                    <Send className="h-4 w-4" />
                    {isSendingEmail ? "Sending..." : "Send Notification"}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setShowNotificationForm(false)}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
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
                >
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
