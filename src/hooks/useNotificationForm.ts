
import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationFormData } from '@/components/checklists/NotificationForm';

interface UseNotificationFormProps {
  pdfBlob: Blob | null;
  onCancel: () => void;
}

export const useNotificationForm = ({ pdfBlob, onCancel }: UseNotificationFormProps) => {
  const [isSending, setIsSending] = useState(false);
  
  const sendNotification = async (data: NotificationFormData) => {
    setIsSending(true);
    
    try {
      const contactInfo = data.contactInfo;
      const message = data.message || '';
      
      // Get profile data from localStorage
      const profileData = localStorage.getItem('userProfile') 
        ? JSON.parse(localStorage.getItem('userProfile') || '{}') 
        : {};
      
      // Determine if it's an email or phone
      const isEmail = contactInfo.includes('@');
      
      // Create notification content
      const notificationData = {
        to: isEmail ? contactInfo : 'sms:' + contactInfo, // Format for SMS if it's a phone number
        subject: 'Pilot Checklist Completion Notification',
        content: {
          profile: profileData,
          message: message
        },
        pdfAttachment: pdfBlob ? true : false
      };
      
      // In a real implementation, this would send the email/SMS via an API
      console.log("Sending notification with data:", notificationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Notification sent to ${isEmail ? 'email' : 'phone'}!`, {
        description: `Your checklist data has been sent to ${contactInfo}.`,
      });
      
      // Close form
      onCancel();
      
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return {
    isSending,
    sendNotification
  };
};
