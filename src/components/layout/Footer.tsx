
import React, { useContext } from 'react';
import { Home, List, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChecklistContext } from '@/context/ChecklistContext';

const Footer: React.FC = () => {
  const { setFilterCategory } = useContext(ChecklistContext);

  const handleFilterSelect = (category: string | null) => {
    setFilterCategory(category);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 glass-panel animate-slide-up border-t">
      <div className="flex items-center justify-around py-2">
        <NavButton 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          active 
          onClick={() => handleFilterSelect(null)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center py-1 rounded-xl transition-all text-muted-foreground"
            >
              <div>
                <List className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">Lists</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => handleFilterSelect('identification')}
            >
              Identification
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => handleFilterSelect('proficiency')}
            >
              Flight Proficiency FAR 61.107(b)(1)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => handleFilterSelect('knowledge')}
            >
              Aeronautical Knowledge FAR 61.105(b)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
      onClick={onClick}
    >
      <div className={`${active ? 'animate-ping-small' : ''}`}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Button>
  );
};

export default Footer;
