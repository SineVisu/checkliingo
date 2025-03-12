
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { toast } from "sonner";

interface LicenseNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const LicenseNameDialog: React.FC<LicenseNameDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [licenseName, setLicenseName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleCapture = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // For now, just show a toast - we'll implement the full camera functionality later
      toast.info("Camera access granted! OCR functionality coming soon.");
      // Clean up
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast.error("Unable to access camera");
    }
  };

  const handleSave = () => {
    if (!licenseName.trim()) {
      toast.error("Please enter your license name");
      return;
    }
    onSave(licenseName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter License Name</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="licenseName">Name (as it appears on license)</Label>
            <Input
              id="licenseName"
              value={licenseName}
              onChange={(e) => setLicenseName(e.target.value)}
              placeholder="Enter your name as shown on license"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Button onClick={handleCapture} variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Capture License Photo
            </Button>
            {imageUrl && (
              <div className="mt-2">
                <img src={imageUrl} alt="License" className="max-w-full rounded-lg" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseNameDialog;
