import { NodePosition } from 'roosterjs-editor-types';
import { SelectionContext } from './SelectionContext';

/**
 * @internal
 */
export interface SelectionInfo {
    start?: NodePosition;
    end?: NodePosition;
    context: SelectionContext;
}
