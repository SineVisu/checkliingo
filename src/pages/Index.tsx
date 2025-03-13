
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
      { id: '103', title: 'Certificate Number', isCompleted: false, category: 'identification' }
    ]
  },
  {
    id: '2',
    title: 'Pilot\'s Medical',
    items: [
      { id: '201', title: 'Name as it appears on Medical', isCompleted: false, category: 'medical' },
      { id: '202', title: 'Date of Examination', isCompleted: false, category: 'medical' }
    ]
  },
  {
    id: '3',
    title: 'FTN# (FAA Tracking Number)',
    items: [
      { id: '104', title: 'FTN# (FAA Tracking Number)', isCompleted: false, category: 'identification' }
    ]
  },
  {
    id: '4',
    title: 'Flight Proficiency FAR 61.107(b)(1)',
    items: [
      { id: '401', title: '(i) Preflight preparation', isCompleted: false, category: 'proficiency' },
      { id: '402', title: 'Preflight procedures', isCompleted: false, category: 'proficiency' },
      { id: '403', title: 'Airport and seaplane base operations', isCompleted: false, category: 'proficiency' },
      { id: '404', title: 'Takeoffs, landings, and go-arounds', isCompleted: false, category: 'proficiency' },
      { id: '405', title: 'Performance maneuvers', isCompleted: false, category: 'proficiency' },
      { id: '406', title: 'Ground reference maneuvers', isCompleted: false, category: 'proficiency' },
      { id: '407', title: 'Navigation', isCompleted: false, category: 'proficiency' },
      { id: '408', title: 'Slow flight and stalls', isCompleted: false, category: 'proficiency' },
      { id: '409', title: 'Basic instrument maneuvers', isCompleted: false, category: 'proficiency' },
      { id: '410', title: 'Emergency operations', isCompleted: false, category: 'proficiency' },
      { id: '411', title: 'Night operations', isCompleted: false, category: 'proficiency' },
      { id: '412', title: 'Postflight procedures', isCompleted: false, category: 'proficiency' }
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
