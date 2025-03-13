
import React from 'react';
import IndexContent from '@/components/pages/IndexContent';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

const initialData: ChecklistGroupData[] = [
  {
    id: '1',
    title: 'Pilot\'s Certificate',
    items: [
      { id: '101', title: 'Name as it appears on Certificate', isCompleted: false, category: 'identification' },
      { id: '102', title: 'Date of Issuance', isCompleted: false, category: 'identification' },
      { id: '103', title: 'Certificate Number', isCompleted: false, category: 'identification' },
      { id: '104', title: 'FTN# (FAA Tracking Number)', isCompleted: false, category: 'identification' }
    ]
  },
  {
    id: '2',
    title: 'Pilot\'s Medical',
    items: [
      { id: '201', title: 'Name as it appears on Medical', isCompleted: false, category: 'medical' },
      { id: '202', title: 'Date of Examination', isCompleted: false, category: 'medical' }
    ]
  }
];

const Index = () => {
  return (
    <ChecklistProvider initialData={initialData}>
      <IndexContent />
    </ChecklistProvider>
  );
};

export default Index;
