
/**
 * Utility functions for validating pilot data across documents
 */

/**
 * Compare names across pilot documents to ensure consistency
 * @param name1 First name to compare
 * @param name2 Second name to compare
 * @returns boolean indicating if names match (true) or not (false)
 */
export const compareNames = (name1?: string, name2?: string): boolean => {
  if (!name1 || !name2) return false;
  
  // Normalize names by:
  // 1. Converting to lowercase
  // 2. Removing extra whitespace
  // 3. Removing punctuation (commas, periods)
  const normalizeName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,]/g, '')
      .trim();
  };

  const normalizedName1 = normalizeName(name1);
  const normalizedName2 = normalizeName(name2);
  
  return normalizedName1 === normalizedName2;
};

/**
 * Detect if name1 has a middle name that name2 doesn't have
 * @param name1 First name to check (typically pilot certificate)
 * @param name2 Second name to check (typically medical certificate)
 * @returns boolean indicating if name1 has a middle name that name2 doesn't
 */
export const hasMiddleNameDiscrepancy = (name1?: string, name2?: string): boolean => {
  if (!name1 || !name2) return false;
  
  // Normalize and split names into parts
  const normalizeName = (name: string): string[] => {
    return name
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,]/g, '')
      .trim()
      .split(' ');
  };

  const nameParts1 = normalizeName(name1);
  const nameParts2 = normalizeName(name2);
  
  // If first name has more parts than second name, it might have a middle name
  // that the second name doesn't have
  if (nameParts1.length > nameParts2.length) {
    // Ensure the first and last parts match (first and last name)
    const firstName1 = nameParts1[0];
    const lastName1 = nameParts1[nameParts1.length - 1];
    
    const firstName2 = nameParts2[0];
    const lastName2 = nameParts2[nameParts2.length - 1];
    
    return firstName1 === firstName2 && lastName1 === lastName2;
  }
  
  return false;
};

/**
 * Determine if there is a general name discrepancy excluding middle name issues
 * @param name1 First name to check (typically pilot certificate)
 * @param name2 Second name to check (typically medical certificate)
 * @returns boolean indicating if there's a non-middle-name discrepancy
 */
export const hasGeneralNameDiscrepancy = (name1?: string, name2?: string): boolean => {
  if (!name1 || !name2) return false;
  
  // Check if names match
  const namesMatch = compareNames(name1, name2);
  
  // Check if there's a middle name discrepancy
  const hasMiddleNameIssue = hasMiddleNameDiscrepancy(name1, name2);
  
  // Return true if names don't match AND it's not a middle name issue
  return !namesMatch && !hasMiddleNameIssue;
};
