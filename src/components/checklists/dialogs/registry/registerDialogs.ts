
import { DialogRegistry } from './DialogRegistry';
import { registerIdentificationDialogs } from './registerIdentificationDialogs';
import { registerKnowledgeTestDialogs } from './registerKnowledgeTestDialogs';
import { registerAeronauticalKnowledgeDialogs } from './registerAeronauticalKnowledgeDialogs';
import { registerFlightOperationsDialogs } from './registerFlightOperationsDialogs';

/**
 * Register all dialog types with the registry
 */
export function registerDialogs(): void {
  // First clear the registry to avoid duplicates
  DialogRegistry.clear();
  
  // Register all dialog types
  registerIdentificationDialogs();
  registerKnowledgeTestDialogs();
  registerAeronauticalKnowledgeDialogs();
  registerFlightOperationsDialogs();
}
