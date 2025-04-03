
import React from 'react';
import IndexContent from '@/components/pages/IndexContent';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';
import { Layout } from '@/components/layout/Layout';

const Index = () => {
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <Layout activeTab="home">
        <IndexContent />
      </Layout>
    </ChecklistProvider>
  );
};

export default Index;
