
import React from 'react';
import { 
  isSafeOperationAircraftDialog,
  isDensityAltitudeDialog,
  isWeightBalanceComputationsDialog,
  isAerodynamicsPowerplantsDialog,
  isStallAwarenessDialog,
  isAeronauticalDecisionMakingDialog,
  isPreflightActionDialog,
  isExperienceDialog
} from '../dialogHelpers';
import SafeOperationDialogWrapper from '../SafeOperationDialogWrapper';
import DensityAltitudeDialogWrapper from '../DensityAltitudeDialogWrapper';
import WeightBalanceComputationsDialogWrapper from '../WeightBalanceComputationsDialogWrapper';
import AerodynamicsPowerplantsDialogWrapper from '../AerodynamicsPowerplantsDialogWrapper';
import StallAwarenessDialogWrapper from '../StallAwarenessDialogWrapper';
import AeronauticalDecisionMakingDialogWrapper from '../AeronauticalDecisionMakingDialogWrapper';
import PreflightActionDialogWrapper from '../PreflightActionDialogWrapper';
import LogbookPageDialogWrapper from '../LogbookPageDialogWrapper';

interface FlightOperationsDialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  onSaveLogbookPage: (pageNumber: string) => void;
  initialValue?: any;
  category?: string;
}

export const FlightOperationsDialogSelector: React.FC<FlightOperationsDialogSelectorProps> = (props) => {
  const { itemTitle, category } = props;
  
  if (isSafeOperationAircraftDialog(itemTitle)) {
    return <SafeOperationDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isDensityAltitudeDialog(itemTitle)) {
    return <DensityAltitudeDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isWeightBalanceComputationsDialog(itemTitle)) {
    return <WeightBalanceComputationsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isAerodynamicsPowerplantsDialog(itemTitle)) {
    return <AerodynamicsPowerplantsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isStallAwarenessDialog(itemTitle)) {
    return <StallAwarenessDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isAeronauticalDecisionMakingDialog(itemTitle)) {
    return <AeronauticalDecisionMakingDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isPreflightActionDialog(itemTitle)) {
    return <PreflightActionDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isExperienceDialog(category)) {
    return <LogbookPageDialogWrapper {...props} />;
  }

  return null;
};
