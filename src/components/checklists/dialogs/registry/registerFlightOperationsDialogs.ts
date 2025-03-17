
import { DialogRegistry } from './DialogRegistry';
import SafeOperationDialogWrapper from '../SafeOperationDialogWrapper';
import DensityAltitudeDialogWrapper from '../DensityAltitudeDialogWrapper';
import WeightBalanceComputationsDialogWrapper from '../WeightBalanceComputationsDialogWrapper';
import AerodynamicsPowerplantsDialogWrapper from '../AerodynamicsPowerplantsDialogWrapper';
import StallAwarenessDialogWrapper from '../StallAwarenessDialogWrapper';
import AeronauticalDecisionMakingDialogWrapper from '../AeronauticalDecisionMakingDialogWrapper';
import PreflightActionDialogWrapper from '../PreflightActionDialogWrapper';
import LogbookPageDialogWrapper from '../LogbookPageDialogWrapper';
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

export function registerFlightOperationsDialogs(): void {
  // Safe Operation Aircraft Dialog
  DialogRegistry.register({
    matcher: (title) => isSafeOperationAircraftDialog(title),
    component: (props) => (
      <SafeOperationDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Density Altitude Dialog
  DialogRegistry.register({
    matcher: (title) => isDensityAltitudeDialog(title),
    component: (props) => (
      <DensityAltitudeDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Weight Balance Computations Dialog
  DialogRegistry.register({
    matcher: (title) => isWeightBalanceComputationsDialog(title),
    component: (props) => (
      <WeightBalanceComputationsDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Aerodynamics Powerplants Dialog
  DialogRegistry.register({
    matcher: (title) => isAerodynamicsPowerplantsDialog(title),
    component: (props) => (
      <AerodynamicsPowerplantsDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Stall Awareness Dialog
  DialogRegistry.register({
    matcher: (title) => isStallAwarenessDialog(title),
    component: (props) => (
      <StallAwarenessDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Aeronautical Decision Making Dialog
  DialogRegistry.register({
    matcher: (title) => isAeronauticalDecisionMakingDialog(title),
    component: (props) => (
      <AeronauticalDecisionMakingDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Preflight Action Dialog
  DialogRegistry.register({
    matcher: (title) => isPreflightActionDialog(title),
    component: (props) => (
      <PreflightActionDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Experience Dialog
  DialogRegistry.register({
    matcher: (title, category) => isExperienceDialog(category),
    component: (props) => <LogbookPageDialogWrapper {...props} />
  });
}
