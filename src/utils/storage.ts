
/**
 * Utility functions for working with localStorage
 */

// Keys for localStorage
export const STORAGE_KEYS = {
  PROFILE_FIRST_NAME: 'profile_first_name',
  PROFILE_LAST_NAME: 'profile_last_name',
  PILOT_CERTIFICATION: 'pilot_certification',
  MEDICAL_CLASS: 'medical_class'
};

// Save a value to localStorage
export const saveToStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

// Get a value from localStorage
export const getFromStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return null;
  }
};
