
import React from 'react';
import IndexContent from '@/components/pages/IndexContent';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';

const Index = () => {
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <IndexContent />
    </ChecklistProvider>
  );
};

export default Index;
