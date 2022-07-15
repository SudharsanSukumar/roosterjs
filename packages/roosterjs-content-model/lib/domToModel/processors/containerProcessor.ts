import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { generalBlockProcessor } from './generalBlockProcessor';
import { generalSegmentProcessor } from './generalSegmentProcessor';
import { isBlockElement } from 'roosterjs-editor-dom';
import { isNodeOfType } from '../../domUtils/isNodeOfType';
import { NodeType } from 'roosterjs-editor-types';
import { textProcessor } from './textProcessor';

/**
 * @internal
 */
export function containerProcessor(group: ContentModelBlockGroup, parent: Node) {
    for (let child = parent.firstChild; child; child = child.nextSibling) {
        if (isNodeOfType(child, NodeType.Element)) {
            const processor = isBlockElement(child)
                ? generalBlockProcessor
                : generalSegmentProcessor;

            processor(group, child, {});
        } else if (isNodeOfType(child, NodeType.Text)) {
            const textNode = child as Text;

            let txt = textNode.nodeValue || '';

            textProcessor(group, txt);
        }
    }
}
