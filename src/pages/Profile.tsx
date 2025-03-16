import React, { useState, useEffect, useContext } from 'react';
import { User, Edit2, Award, Stethoscope } from 'lucide-react';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ChecklistContext } from '@/context/ChecklistContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ProfileContent = () => {
  const { checklists, licenseName, setChecklists } = useContext(ChecklistContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCertification, setIsEditingCertification] = useState(false);
  const [pilotCertification, setPilotCertification] = useState('');
  const [medicalClass, setMedicalClass] = useState<string>('');
  
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

  const certificationForm = useForm({
    defaultValues: {
      certification: pilotCertification
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

  const onSubmitCertification = (data: { certification: string }) => {
    setPilotCertification(data.certification);
    setIsEditingCertification(false);
    
    toast.success("Certification updated successfully", {
      description: "Your current pilot certification information has been saved."
    });
  };

  const handleMedicalClassChange = (value: string) => {
    setMedicalClass(value);
    toast.success("Medical class updated", {
      description: `Your medical certification has been set to ${value}.`
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Current Pilot Certification</h2>
          </div>
          
          {!isEditingCertification && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditingCertification(true)}
              className="flex items-center gap-1"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditingCertification ? (
          <Form {...certificationForm}>
            <form onSubmit={certificationForm.handleSubmit(onSubmitCertification)} className="space-y-4">
              <FormField
                control={certificationForm.control}
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
                    setIsEditingCertification(false);
                    certificationForm.reset({
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
      
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Medical Certification</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="medical-class">Medical Class</Label>
            <Select value={medicalClass} onValueChange={handleMedicalClassChange}>
              <SelectTrigger id="medical-class" className="w-full">
                <SelectValue placeholder="Select your medical class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First Class">First Class</SelectItem>
                <SelectItem value="Second Class">Second Class</SelectItem>
                <SelectItem value="Third Class">Third Class</SelectItem>
              </SelectContent>
            </Select>
            {medicalClass && (
              <p className="text-sm text-muted-foreground mt-2">
                Current medical: {medicalClass}
              </p>
            )}
          </div>
        </div>
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
