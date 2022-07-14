import { ContentModelParagraphFormat } from '../../publicTypes/format/ParagraphFormat';
import { ContentModelSegmentFormat } from '../../publicTypes/format/SegmentFormat';

/**
 * @internal
 */
export interface FormatContext {
    blockFormat: ContentModelParagraphFormat;
    segmentFormat: ContentModelSegmentFormat;
    isInSelection: boolean;

    isSelectionCollapsed?: boolean;
    startContainer?: Node;
    endContainer?: Node;
    startOffset?: number;
    endOffset?: number;
}
