
import React, { useState, useEffect } from 'react';
import { User, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize with empty values or from localStorage
  const savedProfile = localStorage.getItem('userProfile');
  const initialProfile = savedProfile ? JSON.parse(savedProfile) : {};
  
  const form = useForm({
    defaultValues: {
      firstName: initialProfile.firstName || '',
      lastName: initialProfile.lastName || ''
    }
  });
  
  useEffect(() => {
    if (!isEditing) {
      // Reset form to the current values when canceling edit
      form.reset({
        firstName: initialProfile.firstName || '',
        lastName: initialProfile.lastName || ''
      });
    }
  }, [isEditing, form]);
  
  const onSubmit = (data: { firstName: string; lastName: string }) => {
    setIsEditing(false);
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      ...initialProfile,
      firstName: data.firstName,
      lastName: data.lastName
    }));
    
    toast.success("Profile updated successfully", {
      description: "Your profile information has been saved."
    });
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Profile</h1>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
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
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-sm text-muted-foreground">Name</Label>
            <p className="text-lg font-medium">
              {form.getValues().firstName} {form.getValues().lastName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
