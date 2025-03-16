
import React, { useContext } from 'react';
import { ChecklistContext } from '@/context/ChecklistContext';
import { PersonalInfoSection } from './PersonalInfoSection';
import { CertificationSection } from './CertificationSection';
import { MedicalSection } from './MedicalSection';
import { OtherFeaturesSection } from './OtherFeaturesSection';

export const ProfileContent = () => {
  const { licenseName } = useContext(ChecklistContext);
  
  return (
    <div className="space-y-6">
      <PersonalInfoSection licenseName={licenseName} />
      <CertificationSection />
      <MedicalSection />
      <OtherFeaturesSection />
    </div>
  );
};
