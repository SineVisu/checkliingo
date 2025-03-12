
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChecklistGroup, { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import StreakCounter from '@/components/common/StreakCounter';
import EmptyState from '@/components/ui/EmptyState';
import { toast } from "sonner";

// Sample data to start with
const initialData: ChecklistGroupData[] = [
  {
    id: '1',
    title: 'Identification',
    items: [
      { id: '101', title: 'License Name', isCompleted: false, category: 'identification' },
      { id: '102', title: 'Check emails', isCompleted: true, category: 'work' },
      { id: '103', title: 'Team meeting', isCompleted: false, category: 'work' }
    ]
  },
  {
    id: '2',
    title: 'Learning Goals',
    items: [
      { id: '201', title: 'Study React hooks', isCompleted: false, category: 'learning' },
      { id: '202', title: 'Complete TypeScript course', isCompleted: false, category: 'learning' },
      { id: '203', title: 'Practice coding problem', isCompleted: true, category: 'learning' }
    ]
  }
];

const Index = () => {
  const [checklists, setChecklists] = useState<ChecklistGroupData[]>(initialData);
  const [streak, setStreak] = useState(3);

  const handleToggleItem = (groupId: string, itemId: string, completed: boolean) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === itemId ? { ...item, isCompleted: completed } : item
            )
          };
        }
        return group;
      })
    );

    // Show toast when completing an item
    if (completed) {
      toast("Task completed!", {
        description: "Keep up the good work!",
        position: "top-center",
      });
    }
  };

  const handleCreateNewChecklist = () => {
    const newId = `group-${Date.now()}`;
    const newGroup: ChecklistGroupData = {
      id: newId,
      title: "New Checklist",
      items: [
        { 
          id: `item-${Date.now()}`, 
          title: "New task", 
          isCompleted: false,
          category: "personal"
        }
      ]
    };

    setChecklists([...checklists, newGroup]);
    
    toast("New checklist created!", {
      description: "Add your tasks to stay organized.",
      position: "top-center",
    });
  };

  // Calculate overall progress
  const totalTasks = checklists.reduce((acc, group) => acc + group.items.length, 0);
  const completedTasks = checklists.reduce(
    (acc, group) => acc + group.items.filter(item => item.isCompleted).length, 
    0
  );
  
  const overallProgress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
      <Header onNewChecklist={handleCreateNewChecklist} />
      
      <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Private Pilot Checkride Checklist</h2>
            <p className="text-muted-foreground text-sm">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
          <StreakCounter count={streak} />
        </div>
        
        {checklists.length > 0 ? (
          <>
            <div className="mb-4 rounded-full bg-muted h-2 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            
            <div className="space-y-6">
              {checklists.map(group => (
                <ChecklistGroup 
                  key={group.id} 
                  group={group} 
                  onToggleItem={handleToggleItem} 
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState onCreateNew={handleCreateNewChecklist} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
