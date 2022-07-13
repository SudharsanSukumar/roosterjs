import { addBlock } from './addBlock';
import { createParagraph } from '../creators/createParagraph';
import { FormatContext } from '../../types/FormatContext';
import {
    ContentModelBlockType,
    ContentModelSegmentType,
    ContentModelBlockGroup,
    ContentModelParagraph,
    ContentModelSegment,
} from 'roosterjs-editor-types';

export function addSegment(
    group: ContentModelBlockGroup,
    context: FormatContext,
    newSegment: ContentModelSegment
) {
    const lastBlock = group.blocks[group.blocks.length - 1];
    let paragraph: ContentModelParagraph;

    if (lastBlock?.blockType == ContentModelBlockType.Paragraph) {
        paragraph = lastBlock;
    } else {
        paragraph = createParagraph(context, true);
        addBlock(group, paragraph);
    }

    const lastSegment = paragraph.segments[paragraph.segments.length - 1];

    if (newSegment.segmentType == ContentModelSegmentType.SelectionMarker) {
        if (!lastSegment || !lastSegment.isSelected) {
            paragraph.segments.push(newSegment);
        }
    } else {
        if (
            newSegment.isSelected &&
            lastSegment?.segmentType == ContentModelSegmentType.SelectionMarker
        ) {
            paragraph.segments.pop();
        }

        paragraph.segments.push(newSegment);
    }
}
