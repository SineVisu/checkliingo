
import React from 'react';
import { Home, List, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 glass-panel animate-slide-up border-t">
      <div className="flex items-center justify-around py-2">
        <NavButton icon={<Home className="h-5 w-5" />} label="Home" active />
        <NavButton icon={<List className="h-5 w-5" />} label="Lists" />
        <NavButton icon={<Trophy className="h-5 w-5" />} label="Achievements" />
        <NavButton icon={<User className="h-5 w-5" />} label="Profile" />
      </div>
    </footer>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active }) => {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <div className={`${active ? 'animate-ping-small' : ''}`}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Button>
  );
};

export default Footer;
