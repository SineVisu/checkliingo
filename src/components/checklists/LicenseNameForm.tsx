
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LicenseNameFormProps {
  licenseName: string;
  onLicenseNameChange: (value: string) => void;
}

const LicenseNameForm: React.FC<LicenseNameFormProps> = ({
  licenseName,
  onLicenseNameChange
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="licenseName">Name (First, Middle, Last)</Label>
      <Input
        id="licenseName"
        value={licenseName}
        onChange={(e) => onLicenseNameChange(e.target.value)}
        placeholder="Enter your name as shown on certificate"
      />
      <p className="text-xs text-muted-foreground">
        Format: First, Middle, Last (include commas)
      </p>
    </div>
  );
};

export default LicenseNameForm;
