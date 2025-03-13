
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalLink } from 'lucide-react';

interface FTNDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ftn: string) => void;
  initialValue?: string;
  dialogTitle?: string;
}

const FTNDialog: React.FC<FTNDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialValue = '',
  dialogTitle = "FTN# (FAA Tracking Number)"
}) => {
  const [ftn, setFtn] = useState(initialValue);

  const handleSave = () => {
    onSave(ftn.toUpperCase());
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase as the user types
    setFtn(e.target.value.toUpperCase());
  };

  const openFtnHelp = () => {
    window.open('https://www.faa.gov/sites/faa.gov/files/training_testing/testing/acts/ftn_faqs.pdf', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            value={ftn}
            onChange={handleInputChange}
            className="w-full"
            placeholder="Enter your FTN# (e.g., A1B2C3D4)"
            autoCapitalize="characters"
          />
          <p className="text-xs text-muted-foreground mt-2">
            FTN# can contain both numbers and letters. All letters will be automatically converted to uppercase.
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 w-full flex items-center justify-center" 
            onClick={openFtnHelp}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> How do I find my FTN#?
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FTNDialog;
