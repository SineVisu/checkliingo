
import { DialogRegistry } from './DialogRegistry';
import KnowledgeTestResultsDialogWrapper from '../KnowledgeTestResultsDialogWrapper';
import { isKnowledgeTestResultsDialog } from '../dialogHelpers';

export function registerKnowledgeTestDialogs(): void {
  // Knowledge Test Results Dialog
  DialogRegistry.register({
    matcher: (title) => isKnowledgeTestResultsDialog(title),
    component: (props) => <KnowledgeTestResultsDialogWrapper {...props} />
  });
}
