import { ContentModelParagraphFormat, ContentModelSegmentFormat } from 'roosterjs-editor-types';

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
