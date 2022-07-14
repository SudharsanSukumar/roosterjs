import { isNodeOfType } from '../../domUtils/isNodeOfType';
import { NodePosition, NodeType } from 'roosterjs-editor-types';
import { Position } from 'roosterjs-editor-dom';
import { SelectionContext } from '../types/SelectionContext';

/**
 * @internal
 */
export function getSelectionPosition(context: SelectionContext): NodePosition | undefined {
    if (!context.currentBlockNode) {
        return undefined;
    } else if (!context.currentSegmentNode) {
        return new Position(context.currentBlockNode, 0);
    } else if (isNodeOfType(context.currentSegmentNode, NodeType.Text)) {
        return new Position(
            context.currentSegmentNode,
            context.currentSegmentNode.nodeValue!.length
        );
    } else {
        return new Position(
            context.currentSegmentNode.parentNode!,
            indexOf(context.currentSegmentNode) + 1
        );
    }
}

function indexOf(node: Node): number {
    let index = 0;
    for (
        let child = node.parentNode!.firstChild;
        child && child != node;
        child = child.nextSibling
    ) {
        index++;
    }

    return index;
}
