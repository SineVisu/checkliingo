
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

export interface UseNameDiscrepancyProps {
  checklists: ChecklistGroupData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>;
}

export interface NameDiscrepancyState {
  licenseName: string | undefined;
  medicalName: string | undefined;
  nameDiscrepancyDetected: boolean;
  middleNameDiscrepancyDetected: boolean;
  generalNameDiscrepancyDetected: boolean;
  showNameDiscrepancy: boolean;
  showMiddleNameDiscrepancy: boolean;
  setShowNameDiscrepancy: (show: boolean) => void;
  setShowMiddleNameDiscrepancy: (show: boolean) => void;
  checkNameDiscrepancy: () => void;
  acknowledgeNameDiscrepancy: () => void;
  acknowledgeMiddleNameDiscrepancy: () => void;
}
