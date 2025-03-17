
import React from 'react';
import { 
  isAeronauticalKnowledgeFARDialog,
  isNTSBAccidentReportingDialog,
  isAIMAdvisoryCircularsDialog,
  isVFRNavigationChartsDialog,
  isRadioCommunicationProceduresDialog,
  isCriticalWeatherSituationsDialog,
  isTrainingDialog
} from '../dialogHelpers';
import PreflightPreparationDialogWrapper from '../PreflightPreparationDialogWrapper';
import NTSBAccidentReportingDialogWrapper from '../NTSBAccidentReportingDialogWrapper';
import AIMAdvisoryCircularsDialogWrapper from '../AIMAdvisoryCircularsDialogWrapper';
import VFRNavigationChartsDialogWrapper from '../VFRNavigationChartsDialogWrapper';
import RadioCommunicationDialogWrapper from '../RadioCommunicationDialogWrapper';
import CriticalWeatherSituationsDialogWrapper from '../CriticalWeatherSituationsDialogWrapper';

interface AeronauticalKnowledgeDialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

export const AeronauticalKnowledgeDialogSelector: React.FC<AeronauticalKnowledgeDialogSelectorProps> = (props) => {
  const { itemTitle } = props;
  
  if (isAeronauticalKnowledgeFARDialog(itemTitle) || isTrainingDialog(itemTitle)) {
    return <PreflightPreparationDialogWrapper {...props} />;
  }

  if (isNTSBAccidentReportingDialog(itemTitle)) {
    return <NTSBAccidentReportingDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isAIMAdvisoryCircularsDialog(itemTitle)) {
    return <AIMAdvisoryCircularsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isVFRNavigationChartsDialog(itemTitle)) {
    return <VFRNavigationChartsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isRadioCommunicationProceduresDialog(itemTitle)) {
    return <RadioCommunicationDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }
  
  if (isCriticalWeatherSituationsDialog(itemTitle)) {
    return <CriticalWeatherSituationsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  return null;
};
