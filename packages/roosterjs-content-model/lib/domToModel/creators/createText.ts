import { ContentModelSegmentType, ContentModelText } from 'roosterjs-editor-types';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createText(context: FormatContext, text: string): ContentModelText {
    const result: ContentModelText = {
        segmentType: ContentModelSegmentType.Text,
        text: text,
        format: context.segmentFormat,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
