import { addSegment } from '../utils/addSegment';
import { ContentModel_BlockGroup } from '../../types/ContentModel';
import { createSelectionMarker } from '../creators/createSelectionMarker';
import { FormatContext } from '../../types/internal/FormatContext';
import { generalBlockProcessor } from './generalBlockProcessor';
import { generalSegmentProcessor } from './generalSegmentProcessor';
import { isNodeOfType } from '../../domUtils/isNodeOfType';
import { NodeType } from 'roosterjs-editor-types';
import { textProcessor } from './textProcessor';

// https://www.w3schools.com/cssref/pr_class_display.asp
export const BlockDisplay = ['block', 'flex', 'grid', 'list-item'];

// const InlineDisplay = [
//     'inline',
//     'inline-block',
//     'inline-flex',
//     'inline-grid',
//     'inline-table',
//     'contents',
// ];

// const OtherDisplay = [
//     'table',
//     'table-caption',
//     'table-column-group',
//     'table-header-group',
//     'table-footer-group',
//     'table-row-group',
//     'table-cell',
//     'table-column',
//     'table-row',
//     'run-in',
//     'initial',
//     'none',
// ];

export function containerProcessor(
    group: ContentModel_BlockGroup,
    parent: Node,
    context: FormatContext
) {
    let nodeStartOffset = context.startContainer == parent ? context.startOffset : -1;
    let nodeEndOffset = context.endContainer == parent ? context.endOffset : -1;
    let index = 0;

    for (let child = parent.firstChild; child; child = child.nextSibling) {
        if (index == nodeStartOffset) {
            context.isInSelection = true;

            addSegment(group, context, createSelectionMarker(context));
        }

        if (index == nodeEndOffset) {
            if (!context.isSelectionCollapsed) {
                addSegment(group, context, createSelectionMarker(context));
            }
            context.isInSelection = false;
        }

        if (isNodeOfType(child, NodeType.Element)) {
            const handler = context.tagHandlers[child.tagName];
            const format = handler
                ? typeof handler.style === 'function'
                    ? handler.style(child)
                    : handler.style
                : {};
            const processor =
                handler?.processor ||
                (BlockDisplay.indexOf(child.style.display || format.display) >= 0
                    ? generalBlockProcessor
                    : generalSegmentProcessor);

            processor(group, context, child, format || {});
        } else if (isNodeOfType(child, NodeType.Text)) {
            const textNode = child as Text;

            let txt = textNode.nodeValue;
            let txtStartOffset = context.startContainer == textNode ? context.startOffset : -1;
            let txtEndOffset = context.endContainer == textNode ? context.endOffset : -1;

            if (txtStartOffset >= 0) {
                textProcessor(group, txt.substring(0, txtStartOffset), context);
                context.isInSelection = true;

                addSegment(group, context, createSelectionMarker(context));

                txt = txt.substring(txtStartOffset);
                txtEndOffset -= txtStartOffset;
            }

            if (txtEndOffset >= 0) {
                textProcessor(group, txt.substring(0, txtEndOffset), context);

                if (!context.isSelectionCollapsed) {
                    addSegment(group, context, createSelectionMarker(context));
                }

                context.isInSelection = false;
                txt = txt.substring(txtEndOffset);
            }

            textProcessor(group, txt, context);
        }

        index++;
    }
}
