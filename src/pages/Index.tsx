
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
      { 
        id: '401', 
        title: '(i) Preflight preparation', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '401-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '401-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '402', 
        title: '(ii) Preflight procedures', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '402-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '402-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '403', 
        title: '(iii) Airport and seaplane base operations', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '403-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '403-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '404', 
        title: '(iv) Takeoffs, landings, and go-arounds', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '404-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '404-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '405', 
        title: '(v) Performance maneuvers', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '405-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '405-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '406', 
        title: '(vi) Ground reference maneuvers', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '406-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '406-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '407', 
        title: '(vii) Navigation', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '407-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '407-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '408', 
        title: '(viii) Slow flight and stalls', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '408-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '408-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '409', 
        title: '(ix) Basic instrument maneuvers', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '409-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '409-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '410', 
        title: '(x) Emergency operations', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '410-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '410-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '411', 
        title: '(xi) Night operations', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '411-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '411-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      },
      { 
        id: '412', 
        title: '(xii) Postflight procedures', 
        isCompleted: false, 
        category: 'proficiency',
        subtasks: [
          { id: '412-1', title: 'Flight', isCompleted: false, category: 'proficiency' },
          { id: '412-2', title: 'Ground', isCompleted: false, category: 'proficiency' }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Aeronautical Knowledge FAR 61.105(b)',
    items: [
      { id: '501', title: '(1) Applicable Federal Aviation Regulations', isCompleted: false, category: 'knowledge' },
      { id: '502', title: '(2) Accident reporting requirements', isCompleted: false, category: 'knowledge' },
      { id: '503', title: '(3) Use of the applicable portions of the AIM', isCompleted: false, category: 'knowledge' },
      { id: '504', title: '(4) Use of aeronautical charts', isCompleted: false, category: 'knowledge' },
      { id: '505', title: '(5) Radio communication procedures', isCompleted: false, category: 'knowledge' },
      { id: '506', title: '(6) Recognition of critical weather situations', isCompleted: false, category: 'knowledge' },
      { id: '507', title: '(7) Safe and efficient operation of aircraft', isCompleted: false, category: 'knowledge' },
      { id: '508', title: '(8) Weight and balance computations', isCompleted: false, category: 'knowledge' },
      { id: '509', title: '(9) Performance charts and limitations', isCompleted: false, category: 'knowledge' },
      { id: '510', title: '(10) Effects of exceeding aircraft limitations', isCompleted: false, category: 'knowledge' },
      { id: '511', title: '(11) Principles of aerodynamics, powerplants and aircraft systems', isCompleted: false, category: 'knowledge' },
      { id: '512', title: '(12) Stall awareness, spin entry, spins, and spin recovery techniques', isCompleted: false, category: 'knowledge' },
      { id: '513', title: '(13) Aeronautical decision making and judgment', isCompleted: false, category: 'knowledge' },
      { id: '514', title: '(14) Preflight action', isCompleted: false, category: 'knowledge' }
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
