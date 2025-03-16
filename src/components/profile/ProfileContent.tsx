
import React from 'react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { CertificationSection } from './CertificationSection';
import { MedicalSection } from './MedicalSection';
import { OtherFeaturesSection } from './OtherFeaturesSection';

export const ProfileContent = () => {
  return (
    <div className="space-y-6">
      <PersonalInfoSection />
      <CertificationSection />
      <MedicalSection />
      <OtherFeaturesSection />
    </div>
  );
};
