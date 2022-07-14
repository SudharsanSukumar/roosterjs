import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { createSegmentFromContent } from './createSegmentFromContent';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SelectionContext } from '../types/SelectionContext';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function createParagraph(
    doc: Document,
    parent: Node,
    paragraph: ContentModelParagraph,
    info: SelectionInfo
) {
    let container: HTMLElement;

    if (paragraph.isDummy) {
        container = parent as HTMLElement;
    } else {
        container = doc.createElement('div');
        parent.appendChild(container);
        ParagraphFormatHandlers.forEach(handler => handler.writeBack(paragraph.format, container));
    }

    setCurrentBlockElement(info.context, container);

    paragraph.segments.forEach(segment => {
        createSegmentFromContent(doc, container, segment, info);
    });
}

function setCurrentBlockElement(context: SelectionContext, element: HTMLElement) {
    context.currentBlockNode = element;
    context.currentSegmentNode = null;
}
