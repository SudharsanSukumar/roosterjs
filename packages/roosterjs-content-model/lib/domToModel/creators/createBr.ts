import { ContentModelBr, ContentModelSegmentType } from 'roosterjs-editor-types';
import { FormatContext } from '../../types/FormatContext';

export function createBr(context: FormatContext): ContentModelBr {
    const result: ContentModelBr = {
        segmentType: ContentModelSegmentType.Br,
        format: {},
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
