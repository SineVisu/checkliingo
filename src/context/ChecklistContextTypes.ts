
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

export interface ChecklistContextType {
  checklists: ChecklistGroupData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>;
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

export const defaultContextValue: ChecklistContextType = {
  checklists: [],
  setChecklists: () => {},
  licenseName: undefined,
  medicalName: undefined,
  nameDiscrepancyDetected: false,
  middleNameDiscrepancyDetected: false,
  generalNameDiscrepancyDetected: false,
  showNameDiscrepancy: false,
  showMiddleNameDiscrepancy: false,
  setShowNameDiscrepancy: () => {},
  setShowMiddleNameDiscrepancy: () => {},
  checkNameDiscrepancy: () => {},
  acknowledgeNameDiscrepancy: () => {},
  acknowledgeMiddleNameDiscrepancy: () => {},
};
