import { containerProcessor } from './containerProcessor';
import { ElementProcessor } from './ElementProcessor';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';

/**
 * @internal
 */
export const knownSegmentProcessor: ElementProcessor = (group, context, element, defaultStyle) => {
    const originalSegmentFormat = context.segmentFormat;

    context.segmentFormat = { ...originalSegmentFormat };
    SegmentFormatHandlers.forEach(handler =>
        handler.parse(context.segmentFormat, element, defaultStyle)
    );

    containerProcessor(group, element, context);

    context.segmentFormat = originalSegmentFormat;
};
