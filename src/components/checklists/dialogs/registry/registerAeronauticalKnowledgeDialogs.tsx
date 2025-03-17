
import React from 'react';
import { DialogRegistry } from './DialogRegistry';
import PreflightPreparationDialogWrapper from '../PreflightPreparationDialogWrapper';
import NTSBAccidentReportingDialogWrapper from '../NTSBAccidentReportingDialogWrapper';
import AIMAdvisoryCircularsDialogWrapper from '../AIMAdvisoryCircularsDialogWrapper';
import VFRNavigationChartsDialogWrapper from '../VFRNavigationChartsDialogWrapper';
import RadioCommunicationDialogWrapper from '../RadioCommunicationDialogWrapper';
import CriticalWeatherSituationsDialogWrapper from '../CriticalWeatherSituationsDialogWrapper';
import { 
  isAeronauticalKnowledgeFARDialog,
  isNTSBAccidentReportingDialog,
  isAIMAdvisoryCircularsDialog,
  isVFRNavigationChartsDialog,
  isRadioCommunicationProceduresDialog,
  isCriticalWeatherSituationsDialog,
  isTrainingDialog
} from '../dialogHelpers';

export function registerAeronauticalKnowledgeDialogs(): void {
  // FAR Knowledge and Training Dialog
  DialogRegistry.register({
    matcher: (title) => isAeronauticalKnowledgeFARDialog(title) || isTrainingDialog(title),
    component: (props) => <PreflightPreparationDialogWrapper {...props} />
  });
  
  // NTSB Accident Reporting Dialog
  DialogRegistry.register({
    matcher: (title) => isNTSBAccidentReportingDialog(title),
    component: (props) => (
      <NTSBAccidentReportingDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // AIM Advisory Circulars Dialog
  DialogRegistry.register({
    matcher: (title) => isAIMAdvisoryCircularsDialog(title),
    component: (props) => (
      <AIMAdvisoryCircularsDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // VFR Navigation Charts Dialog
  DialogRegistry.register({
    matcher: (title) => isVFRNavigationChartsDialog(title),
    component: (props) => (
      <VFRNavigationChartsDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Radio Communication Procedures Dialog
  DialogRegistry.register({
    matcher: (title) => isRadioCommunicationProceduresDialog(title),
    component: (props) => (
      <RadioCommunicationDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
  
  // Critical Weather Situations Dialog
  DialogRegistry.register({
    matcher: (title) => isCriticalWeatherSituationsDialog(title),
    component: (props) => (
      <CriticalWeatherSituationsDialogWrapper
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSavePreflight={props.onSavePreflight}
        initialValue={props.initialValue}
      />
    )
  });
}
