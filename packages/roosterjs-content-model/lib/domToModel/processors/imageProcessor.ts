import { addSegment } from '../utils/addSegment';
import { createImage } from '../creators/createImage';
import { ElementProcessor } from '../../types/ElementProcessor';
import { SegmentFormatHandlers } from '../formatHandlers/SegmentFormatHandlers';

export const imageProcessor: ElementProcessor = (group, context, element, defaultStyle) => {
    const imageElement = element as HTMLImageElement;

    const originalSegmentFormat = context.segmentFormat;
    context.segmentFormat = { ...originalSegmentFormat };

    SegmentFormatHandlers.forEach(handler =>
        handler.parse(context.segmentFormat, imageElement, defaultStyle)
    );

    addSegment(group, context, createImage(context, imageElement));

    context.segmentFormat = originalSegmentFormat;
};
