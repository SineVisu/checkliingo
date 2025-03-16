
import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const MedicalSection = () => {
  const [medicalClass, setMedicalClass] = useState<string>('');
  
  const handleMedicalClassChange = (value: string) => {
    setMedicalClass(value);
    toast.success("Medical class updated", {
      description: `Your medical certification has been set to ${value}.`
    });
  };
  
  return (
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
  );
};
