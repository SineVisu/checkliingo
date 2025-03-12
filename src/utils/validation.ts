
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
