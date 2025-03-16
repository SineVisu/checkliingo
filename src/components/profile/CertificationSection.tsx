
import React, { useState, useEffect } from 'react';
import { Award, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { saveToStorage, getFromStorage, STORAGE_KEYS } from '@/utils/storage';

export const CertificationSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [pilotCertification, setPilotCertification] = useState('');
  
  // Load saved certification on initial render
  useEffect(() => {
    const savedCertification = getFromStorage(STORAGE_KEYS.PILOT_CERTIFICATION);
    if (savedCertification) {
      setPilotCertification(savedCertification);
    }
  }, []);
  
  const form = useForm({
    defaultValues: {
      certification: pilotCertification
    }
  });
  
  // Update form when pilotCertification changes
  useEffect(() => {
    if (!isEditing) {
      form.reset({
        certification: pilotCertification
      });
    }
  }, [pilotCertification, isEditing, form]);
  
  const onSubmit = (data: { certification: string }) => {
    setPilotCertification(data.certification);
    saveToStorage(STORAGE_KEYS.PILOT_CERTIFICATION, data.certification);
    setIsEditing(false);
    
    toast.success("Certification updated successfully", {
      description: "Your current pilot certification information has been saved."
    });
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Current Pilot Certification</h2>
        </div>
        
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="certification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your current pilot certification details (e.g., Student Pilot, Private Pilot, Commercial Pilot, etc.)"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  form.reset({
                    certification: pilotCertification
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Certification</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div>
          {pilotCertification ? (
            <p className="text-base">{pilotCertification}</p>
          ) : (
            <p className="text-muted-foreground italic">
              No certification information added yet. Click 'Edit' to add your current pilot certification.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
