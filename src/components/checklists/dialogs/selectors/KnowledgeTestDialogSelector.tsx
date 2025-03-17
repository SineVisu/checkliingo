
import React from 'react';
import { isKnowledgeTestResultsDialog } from '../dialogHelpers';
import KnowledgeTestResultsDialogWrapper from '../KnowledgeTestResultsDialogWrapper';

interface KnowledgeTestDialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveKnowledgeTestResults: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  initialValue?: any;
}

export const KnowledgeTestDialogSelector: React.FC<KnowledgeTestDialogSelectorProps> = (props) => {
  const { itemTitle } = props;
  
  if (isKnowledgeTestResultsDialog(itemTitle)) {
    return <KnowledgeTestResultsDialogWrapper {...props} />;
  }

  return null;
};
