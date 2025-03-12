
import React from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewChecklist: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChecklist }) => {
  return (
    <header className="sticky top-0 z-10 px-4 py-3 glass-panel animate-slide-down">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Checklist
          </h1>
        </div>
        <Button 
          onClick={onNewChecklist} 
          size="icon" 
          className="rounded-full bg-primary hover:bg-primary/90 transition-all"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
