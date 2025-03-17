
import React, { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export interface NotificationFormData {
  contactInfo: string;
  message?: string;
}

interface NotificationFormProps {
  pdfBlob: Blob | null;
  onCancel: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ 
  pdfBlob, 
  onCancel 
}) => {
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<NotificationFormData>({
    defaultValues: {
      contactInfo: '',
      message: 'I\'ve completed my private pilot checklist and am eligible for the practical test.'
    }
  });
  
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
      
      // Reset form and close it
      form.reset();
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
  
  return (
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
              disabled={isSending}
            >
              <Send className="h-4 w-4" />
              {isSending ? "Sending..." : "Send Notification"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full gap-2"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NotificationForm;
