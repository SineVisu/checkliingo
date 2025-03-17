
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

// Note: This component is kept for backward compatibility but is no longer used directly.
// Dialog selection is now handled by the DialogRegistry
export const KnowledgeTestDialogSelector: React.FC<KnowledgeTestDialogSelectorProps> = (props) => {
  const { itemTitle } = props;
  
  if (isKnowledgeTestResultsDialog(itemTitle)) {
    return <KnowledgeTestResultsDialogWrapper {...props} />;
  }

  return null;
};
