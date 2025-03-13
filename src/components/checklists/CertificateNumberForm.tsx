
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CertificateNumberFormProps {
  certificateNumber: string;
  onCertificateNumberChange: (value: string) => void;
}

const CertificateNumberForm: React.FC<CertificateNumberFormProps> = ({
  certificateNumber,
  onCertificateNumberChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '');
    onCertificateNumberChange(numericValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="certificateNumber">Certificate Number</Label>
      <Input
        id="certificateNumber"
        value={certificateNumber}
        onChange={handleInputChange}
        placeholder="Enter your certificate number (7+ digits)"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <p className="text-xs text-muted-foreground">
        Must be at least 7 digits, numbers only
      </p>
    </div>
  );
};

export default CertificateNumberForm;
