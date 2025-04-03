
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: 'home' | 'lists' | 'profile' | 'progress';
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'home' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pb-20">
        {children}
      </div>
      <Footer activeTab={activeTab} />
    </div>
  );
};

export default Layout;
