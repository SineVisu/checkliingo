
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import ProgressContent from '@/components/pages/ProgressContent';
import { ChecklistProvider } from '@/context/ChecklistProvider';
import { initialChecklistData } from '@/data/initialChecklistData';

const Progress = () => {
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <Layout activeTab="progress">
        <ProgressContent />
      </Layout>
    </ChecklistProvider>
  );
};

export default Progress;
