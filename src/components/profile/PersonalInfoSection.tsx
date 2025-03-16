
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from './ProfileSchema';
import { ProfileHeader } from './ProfileHeader';
import { ProfileForm } from './ProfileForm';
import { ProfileDisplay } from './ProfileDisplay';

export const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize with empty values or from localStorage
  const savedProfile = localStorage.getItem('userProfile');
  const initialProfile = savedProfile ? JSON.parse(savedProfile) : {};
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialProfile.firstName || '',
      lastName: initialProfile.lastName || '',
      email: initialProfile.email || '',
      trainingMethod: initialProfile.trainingMethod || '',
      learnMoreAboutFlyber: initialProfile.learnMoreAboutFlyber || false,
      trainingAirport: initialProfile.trainingAirport || ''
    }
  });
  
  useEffect(() => {
    if (!isEditing) {
      // Reset form to the current values when canceling edit
      form.reset({
        firstName: initialProfile.firstName || '',
        lastName: initialProfile.lastName || '',
        email: initialProfile.email || '',
        trainingMethod: initialProfile.trainingMethod || '',
        learnMoreAboutFlyber: initialProfile.learnMoreAboutFlyber || false,
        trainingAirport: initialProfile.trainingAirport || ''
      });
    }
  }, [isEditing, form]);
  
  const onSubmit = (data: ProfileFormValues) => {
    setIsEditing(false);
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      ...initialProfile,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      trainingMethod: data.trainingMethod,
      learnMoreAboutFlyber: data.learnMoreAboutFlyber,
      trainingAirport: data.trainingAirport
    }));
    
    toast.success("Profile updated successfully", {
      description: "Your profile information has been saved."
    });
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <ProfileHeader 
        isEditing={isEditing} 
        onEditClick={() => setIsEditing(true)} 
      />
      
      {isEditing ? (
        <ProfileForm 
          form={form} 
          onSubmit={onSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <ProfileDisplay profile={form.getValues()} />
      )}
    </div>
  );
};
