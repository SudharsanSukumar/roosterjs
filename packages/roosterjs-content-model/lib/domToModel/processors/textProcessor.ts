import { addSegment } from '../utils/addSegment';
import { areSameFormats } from '../utils/areSameFormats';
import { ContentModel_BlockGroup } from '../../types/ContentModel';
import { ContentModel_BlockType } from '../../types/BlockType';
import { ContentModel_SegmentType } from '../../types/SegmentType';
import { createText } from '../creators/createText';
import { FormatContext } from '../../types/internal/FormatContext';

export function textProcessor(
    group: ContentModel_BlockGroup,
    text: string,
    context: FormatContext
) {
    if (text) {
        const paragraph = group.blocks[group.blocks.length - 1];
        const lastSegment =
            paragraph?.blockType == ContentModel_BlockType.Paragraph &&
            paragraph.segments[paragraph.segments.length - 1];

        if (
            lastSegment &&
            lastSegment.segmentType == ContentModel_SegmentType.Text &&
            lastSegment.isSelected == context.isInSelection &&
            areSameFormats(lastSegment.format, context.segmentFormat)
        ) {
            lastSegment.text += text;
        } else {
            const originalSegmentFormat = context.segmentFormat;

            context.segmentFormat = { ...originalSegmentFormat };
            addSegment(group, context, createText(context, text));
            context.segmentFormat = originalSegmentFormat;
        }
    }
}
