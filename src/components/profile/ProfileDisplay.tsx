
import React from 'react';
import { Label } from "@/components/ui/label";
import { ProfileFormValues } from './ProfileSchema';

interface ProfileDisplayProps {
  profile: ProfileFormValues;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile }) => {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label className="text-sm text-muted-foreground">Name</Label>
        <p className="text-lg font-medium">
          {profile.firstName} {profile.lastName}
        </p>
      </div>
      
      <div>
        <Label className="text-sm text-muted-foreground">Email</Label>
        <p className="text-base">
          {profile.email || 'Not specified'}
        </p>
      </div>
      
      {profile.email && profile.learnMoreAboutFlyber && (
        <div>
          <Label className="text-sm text-muted-foreground">Preferences</Label>
          <p className="text-base">
            Subscribed to Flyber updates
          </p>
        </div>
      )}
      
      <div>
        <Label className="text-sm text-muted-foreground">Training Method</Label>
        <p className="text-base">
          {profile.trainingMethod === 'part61' && 'With a Part 61 Flight School'}
          {profile.trainingMethod === 'part141' && 'With a Part 141 Flight School'}
          {profile.trainingMethod === 'independent' && 'With an independent Flight Instructor'}
          {profile.trainingMethod === 'other' && 'Other'}
          {!profile.trainingMethod && 'Not specified'}
        </p>
      </div>
    </div>
  );
};
