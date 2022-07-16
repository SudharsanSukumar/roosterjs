import { addBlock } from '../utils/addBlock';
import { containerProcessor } from './containerProcessor';
import { createParagraph } from '../creators/createParagraph';
import { ElementProcessor } from './ElementProcessor';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';

/**
 * @internal
 */
export const knownBlockProcessor: ElementProcessor = (group, context, element, defaultStyle) => {
    const originalBlockFormat = context.blockFormat;
    const originalSegmentFormat = context.segmentFormat;

    context.blockFormat = {
        ...originalBlockFormat,
    };
    context.segmentFormat = { ...originalSegmentFormat };

    ParagraphFormatHandlers.forEach(handler =>
        handler.parse(context.blockFormat, element, defaultStyle)
    );
    SegmentFormatHandlers.forEach(handler =>
        handler.parse(context.segmentFormat, element, defaultStyle)
    );

    addBlock(group, createParagraph(context, false));

    containerProcessor(group, element, context);
    context.blockFormat = originalBlockFormat;
    context.segmentFormat = originalSegmentFormat;

    addBlock(group, createParagraph(context, false));
};
