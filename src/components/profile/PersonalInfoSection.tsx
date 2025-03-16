
import React, { useState, useEffect } from 'react';
import { User, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PersonalInfoProps {
  licenseName?: string;
}

export const PersonalInfoSection = ({ licenseName }: PersonalInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const extractNames = (fullName?: string) => {
    if (!fullName) return { firstName: '', lastName: '' };
    
    const parts = fullName.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      return {
        lastName: parts[0] || '',
        firstName: parts.slice(1).join(' ') || ''
      };
    }
    
    const spaceParts = fullName.split(' ');
    return {
      firstName: spaceParts[0] || '',
      lastName: spaceParts.slice(1).join(' ') || ''
    };
  };
  
  const { firstName, lastName } = extractNames(licenseName);
  
  const form = useForm({
    defaultValues: {
      firstName,
      lastName
    }
  });
  
  useEffect(() => {
    if (!isEditing) {
      const { firstName, lastName } = extractNames(licenseName);
      form.reset({
        firstName,
        lastName
      });
    }
  }, [licenseName, isEditing, form]);
  
  const onSubmit = (data: { firstName: string; lastName: string }) => {
    setIsEditing(false);
    
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
          
          <div>
            <Label className="text-sm text-muted-foreground">Certificate Name</Label>
            <p className="text-base">{licenseName || "Not provided"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Name as it appears on your pilot certificate
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
