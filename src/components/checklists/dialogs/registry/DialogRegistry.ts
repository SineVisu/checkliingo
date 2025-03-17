
import { ReactNode } from 'react';

export interface DialogRegistryItem {
  matcher: (title: string, category?: string) => boolean;
  component: (props: any) => ReactNode;
}

export class DialogRegistry {
  private static registry: DialogRegistryItem[] = [];

  /**
   * Register a dialog component with its matcher function
   */
  public static register(item: DialogRegistryItem): void {
    this.registry.push(item);
  }

  /**
   * Find the first matching dialog component for the given title and category
   */
  public static findDialog(title: string, category?: string): DialogRegistryItem | undefined {
    return this.registry.find(item => item.matcher(title, category));
  }

  /**
   * Clear the registry (used primarily for testing)
   */
  public static clear(): void {
    this.registry = [];
  }
}
