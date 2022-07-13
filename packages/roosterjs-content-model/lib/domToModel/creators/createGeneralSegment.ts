import { FormatContext } from '../../types/FormatContext';
import {
    ContentModelBlockGroupType,
    ContentModelBlockType,
    ContentModelGeneralSegment,
    ContentModelSegmentType,
} from 'roosterjs-editor-types';

export function createGeneralSegment(
    context: FormatContext,
    element: HTMLElement
): ContentModelGeneralSegment {
    const result: ContentModelGeneralSegment = {
        segmentType: ContentModelSegmentType.General,
        format: {},
        blocks: [],
        node: element.cloneNode(),
        blockType: ContentModelBlockType.BlockGroup,
        blockGroupType: ContentModelBlockGroupType.General,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
