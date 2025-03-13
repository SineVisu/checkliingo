import React, { useState, useContext } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChecklistGroup, { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import StreakCounter from '@/components/common/StreakCounter';
import EmptyState from '@/components/ui/EmptyState';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import LicenseCapture from '@/components/checklists/LicenseCapture';
import MedicalCapture from '@/components/checklists/MedicalCapture';
import NameDiscrepancyDialog from '@/components/checklists/NameDiscrepancyDialog';
import { ChecklistContext, ChecklistProvider } from '@/context/ChecklistContext';

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
  }
];

const IndexContent = () => {
  const [streak, setStreak] = useState(3);
  const [licenseCaptureOpen, setLicenseCaptureOpen] = useState(false);
  const [medicalCaptureOpen, setMedicalCaptureOpen] = useState(false);
  
  const { 
    checklists, 
    setChecklists,
    licenseName,
    medicalName,
    showNameDiscrepancy,
    setShowNameDiscrepancy
  } = useContext(ChecklistContext);

  const handleToggleItem = (groupId: string, itemId: string, completed: boolean, value?: string | Date) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === itemId ? { ...item, isCompleted: completed, value: value || item.value } : item
            )
          };
        }
        return group;
      })
    );

    if (completed && !value) {
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

  const handleCaptureLicense = () => {
    setLicenseCaptureOpen(true);
  };

  const handleCaptureMedical = () => {
    setMedicalCaptureOpen(true);
  };

  const handleLicenseCaptureComplete = (data: {
    name?: string;
    date?: Date;
    certificateNumber?: string;
  }) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === '1') {
          return {
            ...group,
            items: group.items.map(item => {
              if (item.id === '101' && data.name) {
                return { ...item, isCompleted: true, value: data.name };
              }
              else if (item.id === '102' && data.date) {
                return { ...item, isCompleted: true, value: data.date };
              }
              else if (item.id === '103' && data.certificateNumber) {
                return { ...item, isCompleted: true, value: data.certificateNumber };
              }
              return item;
            })
          };
        }
        return group;
      })
    );

    toast.success("Certificate information has been processed!", {
      description: "Your certificate details have been updated automatically.",
      position: "top-center",
    });
  };

  const handleMedicalCaptureComplete = (data: {
    name?: string;
    date?: Date;
  }) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === '2') {
          return {
            ...group,
            items: group.items.map(item => {
              if (item.id === '201' && data.name) {
                return { ...item, isCompleted: true, value: data.name };
              }
              else if (item.id === '202' && data.date) {
                return { ...item, isCompleted: true, value: data.date };
              }
              return item;
            })
          };
        }
        return group;
      })
    );

    toast.success("Medical certificate information has been processed!", {
      description: "Your medical details have been updated automatically.",
      position: "top-center",
    });
  };

  const totalTasks = checklists.reduce((acc, group) => acc + group.items.length, 0);
  const completedTasks = checklists.reduce(
    (acc, group) => acc + group.items.filter(item => item.isCompleted).length, 
    0
  );
  
  const overallProgress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const idGroup = checklists.find(group => group.id === '1');
  const showCaptureButton = idGroup && 
    idGroup.items.filter(item => ['101', '102', '103'].includes(item.id))
    .every(item => !item.isCompleted);

  const medicalGroup = checklists.find(group => group.id === '2');
  const showMedicalCaptureButton = medicalGroup && 
    medicalGroup.items.filter(item => ['201', '202'].includes(item.id))
    .every(item => !item.isCompleted);

  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
      <Header onNewChecklist={handleCreateNewChecklist} />
      
      <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">FAA Private Pilot Practical Test // ASEL Checklist</h2>
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
            
            {showCaptureButton && (
              <div className="my-4">
                <Button 
                  onClick={handleCaptureLicense} 
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture Pilot Certificate
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Take one photo to complete all pilot certificate requirements
                </p>
              </div>
            )}

            {showMedicalCaptureButton && (
              <div className="my-4">
                <Button 
                  onClick={handleCaptureMedical} 
                  className="w-full"
                  variant="outline"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture Medical Certificate
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Take one photo to complete all medical requirements
                </p>
              </div>
            )}
            
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

      <LicenseCapture
        isOpen={licenseCaptureOpen}
        onClose={() => setLicenseCaptureOpen(false)}
        onSave={handleLicenseCaptureComplete}
      />

      <MedicalCapture
        isOpen={medicalCaptureOpen}
        onClose={() => setMedicalCaptureOpen(false)}
        onSave={handleMedicalCaptureComplete}
      />

      <NameDiscrepancyDialog
        isOpen={showNameDiscrepancy}
        onClose={() => setShowNameDiscrepancy(false)}
        licenseName={licenseName}
        medicalName={medicalName}
      />
    </div>
  );
};

const Index = () => {
  return (
    <ChecklistProvider initialData={initialData}>
      <IndexContent />
    </ChecklistProvider>
  );
};

export default Index;
