
import { createContext } from 'react';
import { ChecklistContextType, defaultContextValue } from './ChecklistContextTypes';

export const ChecklistContext = createContext<ChecklistContextType>(defaultContextValue);

export { ChecklistProvider } from './ChecklistProvider';
