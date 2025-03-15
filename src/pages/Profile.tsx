
import React from 'react';
import { User } from 'lucide-react';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
        <Header />
        
        <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
          
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">Profile Coming Soon</h3>
            <p className="text-muted-foreground">This feature is under development</p>
          </div>
        </main>
        
        <Footer activeTab="profile" />
      </div>
    </ChecklistProvider>
  );
};

export default Profile;
