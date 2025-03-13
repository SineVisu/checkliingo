
import { useState } from 'react';

export const useChecklistItemState = () => {
  const [animating, setAnimating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedSubtasks, setExpandedSubtasks] = useState(false);

  return {
    animating,
    setAnimating,
    dialogOpen,
    setDialogOpen,
    expandedSubtasks,
    setExpandedSubtasks
  };
};
