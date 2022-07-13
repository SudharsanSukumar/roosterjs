import { ContentModel_BlockGroupType } from '../../types/BlockGroupType';
import { ContentModel_BlockType } from '../../types/BlockType';
import { ContentModel_GeneralSegment } from '../../types/ContentModel';
import { ContentModel_SegmentType } from '../../types/SegmentType';
import { FormatContext } from '../../types/internal/FormatContext';

export function createGeneralSegment(
    context: FormatContext,
    element: HTMLElement
): ContentModel_GeneralSegment {
    const result: ContentModel_GeneralSegment = {
        segmentType: ContentModel_SegmentType.General,
        format: {},
        blocks: [],
        node: element.cloneNode(),
        blockType: ContentModel_BlockType.BlockGroup,
        blockGroupType: ContentModel_BlockGroupType.General,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
