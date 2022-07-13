import { addBlock } from './addBlock';
import { ContentModel_BlockType } from '../../types/BlockType';
import { ContentModel_SegmentType } from '../../types/SegmentType';
import { createParagraph } from '../creators/createParagraph';
import { FormatContext } from '../../types/internal/FormatContext';
import {
    ContentModel_BlockGroup,
    ContentModel_Paragraph,
    ContentModel_Segment,
} from '../../types/ContentModel';

export function addSegment(
    group: ContentModel_BlockGroup,
    context: FormatContext,
    newSegment: ContentModel_Segment
) {
    const lastBlock = group.blocks[group.blocks.length - 1];
    let paragraph: ContentModel_Paragraph;

    if (lastBlock?.blockType == ContentModel_BlockType.Paragraph) {
        paragraph = lastBlock;
    } else {
        paragraph = createParagraph(context, true);
        addBlock(group, paragraph);
    }

    const lastSegment = paragraph.segments[paragraph.segments.length - 1];

    if (newSegment.segmentType == ContentModel_SegmentType.SelectionMarker) {
        if (!lastSegment || !lastSegment.isSelected) {
            paragraph.segments.push(newSegment);
        }
    } else {
        if (
            newSegment.isSelected &&
            lastSegment?.segmentType == ContentModel_SegmentType.SelectionMarker
        ) {
            paragraph.segments.pop();
        }

        paragraph.segments.push(newSegment);
    }
}
