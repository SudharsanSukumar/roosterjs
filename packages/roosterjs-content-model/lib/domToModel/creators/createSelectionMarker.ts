import { ContentModelSegmentType, ContentModelSelectionMarker } from 'roosterjs-editor-types';
import { FormatContext } from '../../types/FormatContext';

export function createSelectionMarker(context: FormatContext): ContentModelSelectionMarker {
    return {
        segmentType: ContentModelSegmentType.SelectionMarker,
        isSelected: true,
        format: context.segmentFormat,
    };
}
