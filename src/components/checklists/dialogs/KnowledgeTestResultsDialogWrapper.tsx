
import React from 'react';
import KnowledgeTestResultsDialog from '../KnowledgeTestResults/KnowledgeTestResultsDialog';

interface KnowledgeTestResultsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKnowledgeTestResults: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  initialValue?: any;
}

const KnowledgeTestResultsDialogWrapper: React.FC<KnowledgeTestResultsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSaveKnowledgeTestResults,
  initialValue
}) => {
  return (
    <KnowledgeTestResultsDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveKnowledgeTestResults}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { score?: string; date?: Date; pltCodes?: string[] }
          : undefined
      }
    />
  );
};

export default KnowledgeTestResultsDialogWrapper;
