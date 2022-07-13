import { ContentModel_SegmentType } from '../../types/SegmentType';
import { ContentModel_SelectionMarker } from '../../types/ContentModel';
import { FormatContext } from '../../types/internal/FormatContext';

export function createSelectionMarker(context: FormatContext): ContentModel_SelectionMarker {
    return {
        segmentType: ContentModel_SegmentType.SelectionMarker,
        isSelected: true,
        format: context.segmentFormat,
    };
}
