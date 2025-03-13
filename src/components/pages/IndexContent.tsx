
import React, { useState, useContext } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChecklistContent from '@/components/checklists/ChecklistContent';
import CaptureDialogs from '@/components/checklists/CaptureDialogs';
import { toast } from "sonner";
import { ChecklistContext } from '@/context/ChecklistContext';

const IndexContent: React.FC = () => {
  const [streak, setStreak] = useState(3);
  const [licenseCaptureOpen, setLicenseCaptureOpen] = useState(false);
  const [medicalCaptureOpen, setMedicalCaptureOpen] = useState(false);
  
  const { 
    checklists, 
    setChecklists,
    licenseName,
    medicalName,
    showNameDiscrepancy,
    showMiddleNameDiscrepancy,
    setShowNameDiscrepancy,
    setShowMiddleNameDiscrepancy,
    acknowledgeNameDiscrepancy,
    acknowledgeMiddleNameDiscrepancy
  } = useContext(ChecklistContext);

  const handleCreateNewChecklist = () => {
    const newId = `group-${Date.now()}`;
    const newGroup = {
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

  return (
    <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
      <Header onNewChecklist={handleCreateNewChecklist} />
      
      <ChecklistContent 
        streak={streak}
        onCreateNewChecklist={handleCreateNewChecklist}
        onCaptureLicense={handleCaptureLicense}
        onCaptureMedical={handleCaptureMedical}
      />
      
      <Footer />

      <CaptureDialogs 
        licenseCaptureOpen={licenseCaptureOpen}
        medicalCaptureOpen={medicalCaptureOpen}
        showNameDiscrepancy={showNameDiscrepancy}
        showMiddleNameDiscrepancy={showMiddleNameDiscrepancy}
        licenseName={licenseName}
        medicalName={medicalName}
        onCloseLicenseCapture={() => setLicenseCaptureOpen(false)}
        onCloseMedicalCapture={() => setMedicalCaptureOpen(false)}
        onCloseNameDiscrepancy={() => setShowNameDiscrepancy(false)}
        onCloseMiddleNameDiscrepancy={() => setShowMiddleNameDiscrepancy(false)}
        onLicenseCaptureComplete={handleLicenseCaptureComplete}
        onMedicalCaptureComplete={handleMedicalCaptureComplete}
        onAcknowledgeNameDiscrepancy={acknowledgeNameDiscrepancy}
        onAcknowledgeMiddleNameDiscrepancy={acknowledgeMiddleNameDiscrepancy}
      />
    </div>
  );
};

export default IndexContent;
