
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

export const initialChecklistData: ChecklistGroupData[] = [
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
      { id: '201', title: 'Name as it appears on Medical', isCompleted: false, category: 'medical' }
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
      { id: '515', title: 'PAR Knowledge Test Results', isCompleted: false, category: 'knowledge' }
    ]
  },
  {
    id: '6',
    title: 'Aeronautical Experience FAR 61.109',
    items: [
      { id: '600', title: '(1) Applicable FAR\'s: private pilot privileges, limitations, and flight operations', isCompleted: false, category: 'experience' },
      { id: '601', title: '(a)(1) 40 hours of flight time', isCompleted: false, category: 'experience' },
      { id: '602', title: '(a)(2) 20 hours of flight training', isCompleted: false, category: 'experience' },
      { id: '603', title: '(a)(2)(i) 3 hours cross-country flight training', isCompleted: false, category: 'experience' },
      { id: '604', title: '(a)(2)(ii) 3 hours night flight training', isCompleted: false, category: 'experience' },
      { id: '605', title: '(a)(2)(ii)(A) One cross-country flight over 100NM total distance', isCompleted: false, category: 'experience' },
      { id: '606', title: '(a)(2)(ii)(B) 10 takeoffs and landings at an airport', isCompleted: false, category: 'experience' },
      { id: '607', title: '(a)(2)(iii) 3 hours instrument flight training', isCompleted: false, category: 'experience' },
      { id: '608', title: '(a)(2)(iv) 3 hours test preparation', isCompleted: false, category: 'experience' },
      { id: '609', title: '(a)(3) 10 hours of solo flight time', isCompleted: false, category: 'experience' },
      { id: '610', title: '(a)(3)(i) 5 hours cross-country', isCompleted: false, category: 'experience' },
      { id: '611', title: '(a)(3)(ii) One solo cross-country flight of 150NM total', isCompleted: false, category: 'experience' },
      { id: '612', title: '(a)(3)(ii)(A) Full-stop landings at 3 points', isCompleted: false, category: 'experience' },
      { id: '613', title: '(a)(3)(ii)(B) One segment of flight of at least 50NM straight-line distance', isCompleted: false, category: 'experience' },
      { id: '614', title: '(a)(3)(iii) 3 takeoffs and landings at a controlled airport', isCompleted: false, category: 'experience' },
    ]
  }
];
