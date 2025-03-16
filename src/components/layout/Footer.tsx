
import React, { useContext } from 'react';
import { Home, List, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChecklistContext } from '@/context/ChecklistContext';

interface FooterProps {
  activeTab?: 'home' | 'lists' | 'profile';
}

const Footer: React.FC<FooterProps> = ({ 
  activeTab = 'home'
}) => {
  const { setFilterCategory, filterCategory } = useContext(ChecklistContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterSelect = (category: string | null) => {
    setFilterCategory(category);
    // If we're not on the home page, navigate there
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 glass-panel animate-slide-up border-t">
      <div className="flex items-center justify-around py-2">
        <NavButton 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          active={activeTab === 'home'}
          onClick={() => {
            navigateToPage('/');
            setFilterCategory(null);
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                activeTab === 'lists' || filterCategory ? 'text-primary' : 'text-muted-foreground'
              }`}
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
              Identification & Medical
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
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => handleFilterSelect('experience')}
            >
              Aeronautical Experience FAR 61.109
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavButton 
          icon={<User className="h-5 w-5" />} 
          label="Profile" 
          active={activeTab === 'profile'}
          onClick={() => navigateToPage('/profile')}
        />
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
