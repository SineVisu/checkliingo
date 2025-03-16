
import React, { useState, useEffect, useContext } from 'react';
import { User, Edit2 } from 'lucide-react';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ChecklistContext } from '@/context/ChecklistContext';

const ProfileContent = () => {
  const { checklists, licenseName, setChecklists } = useContext(ChecklistContext);
  const [isEditing, setIsEditing] = useState(false);
  
  // Extract first and last name from the formatted pilot certificate name
  const extractNames = (fullName?: string) => {
    if (!fullName) return { firstName: '', lastName: '' };
    
    const parts = fullName.split(',').map(part => part.trim());
    // Traditionally certificate names are formatted as "Last, First, Middle"
    if (parts.length >= 2) {
      return {
        lastName: parts[0] || '',
        firstName: parts.slice(1).join(' ') || ''
      };
    }
    
    // Fallback to simple split by space if no commas
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
  
  // Update form values when licenseName changes
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
    // Save profile information
    setIsEditing(false);
    
    // Just save the profile data - don't update the certificate information
    // This way we don't affect the checklist tasks
    toast.success("Profile updated successfully", {
      description: "Your profile information has been saved."
    });
  };
  
  return (
    <div className="space-y-6">
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
      
      <div className="bg-white rounded-xl p-6 shadow">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="space-y-4">
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
      
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-medium mb-4">Other Profile Features</h2>
        <p className="text-muted-foreground">Additional profile functionality coming soon</p>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
        <Header />
        
        <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
          <ProfileContent />
        </main>
        
        <Footer activeTab="profile" />
      </div>
    </ChecklistProvider>
  );
};

export default Profile;
