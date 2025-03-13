
import React from 'react';
import LogbookPageDialog from '../LogbookPageDialog';

interface LogbookPageDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLogbookPage: (pageNumber: string) => void;
  initialValue?: any;
}

const LogbookPageDialogWrapper: React.FC<LogbookPageDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveLogbookPage,
  initialValue
}) => {
  return (
    <LogbookPageDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveLogbookPage}
      dialogTitle={itemTitle}
      initialValue={typeof initialValue === 'string' ? initialValue : undefined}
    />
  );
};

export default LogbookPageDialogWrapper;
