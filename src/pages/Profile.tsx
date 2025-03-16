
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ProfileContent } from '@/components/profile/ProfileContent';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
      <Header />
      
      <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
        <ProfileContent />
      </main>
      
      <Footer activeTab="profile" />
    </div>
  );
};

export default Profile;
