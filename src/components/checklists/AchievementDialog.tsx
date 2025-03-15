
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

interface AchievementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const AchievementDialog: React.FC<AchievementDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon = <Award className="h-12 w-12 text-amber-500" />
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="bg-amber-100 p-6 rounded-full">
            {icon}
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Achievement Unlocked!</p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Awesome!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementDialog;
