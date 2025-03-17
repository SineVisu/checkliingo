
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNotificationForm } from '@/hooks/useNotificationForm';

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
  const form = useForm<NotificationFormData>({
    defaultValues: {
      contactInfo: '',
      message: 'I\'ve completed my private pilot checklist and am eligible for the practical test.'
    }
  });
  
  const { isSending, sendNotification } = useNotificationForm({
    pdfBlob,
    onCancel
  });
  
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
