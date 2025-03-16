
import React from 'react';
import { User, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isEditing, onEditClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      {!isEditing && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEditClick}
          className="flex items-center gap-1"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
      )}
    </div>
  );
};
