
import React from 'react';
import { DialogRegistry } from './dialogs/registry/DialogRegistry';
import { registerDialogs } from './dialogs/registry/registerDialogs';

// Make sure all dialogs are registered
registerDialogs();

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
  const { itemTitle, category } = props;
  
  // Find the registered dialog that matches the title and category
  const dialogItem = DialogRegistry.findDialog(itemTitle, category);
  
  if (dialogItem) {
    return dialogItem.component(props);
  }
  
  return null;
};

export default DialogSelector;
