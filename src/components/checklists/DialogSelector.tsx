
import React from 'react';
import { IdentificationDialogSelector } from './dialogs/selectors/IdentificationDialogSelector';
import { KnowledgeTestDialogSelector } from './dialogs/selectors/KnowledgeTestDialogSelector';
import { AeronauticalKnowledgeDialogSelector } from './dialogs/selectors/AeronauticalKnowledgeDialogSelector';
import { FlightOperationsDialogSelector } from './dialogs/selectors/FlightOperationsDialogSelector';

interface DialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLicenseName: (name: string) => void;
  onSaveIssuanceDate: (date: Date) => void;
  onSaveCertificateNumber: (number: string) => void;
  onSaveFTN: (ftn: string) => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  onSaveLogbookPage: (pageNumber: string) => void;
  onSaveKnowledgeTestResults: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  initialValue?: any;
  category?: string;
}

const DialogSelector: React.FC<DialogSelectorProps> = (props) => {
  // Try each category of dialogs in sequence
  return (
    <>
      <IdentificationDialogSelector {...props} />
      <KnowledgeTestDialogSelector {...props} />
      <AeronauticalKnowledgeDialogSelector {...props} />
      <FlightOperationsDialogSelector {...props} />
    </>
  );
};

export default DialogSelector;
