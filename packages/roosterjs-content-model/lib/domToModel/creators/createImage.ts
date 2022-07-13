import { ContentModelImage, ContentModelSegmentType } from 'roosterjs-editor-types';
import { FormatContext } from '../../types/FormatContext';

export function createImage(context: FormatContext, img: HTMLImageElement): ContentModelImage {
    const result: ContentModelImage = {
        segmentType: ContentModelSegmentType.Image,
        format: context.segmentFormat,
        src: img.src,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
