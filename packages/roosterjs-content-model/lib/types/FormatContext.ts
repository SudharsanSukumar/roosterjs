import { ContentModelParagraphFormat, ContentModelSegmentFormat } from 'roosterjs-editor-types';
import { TagHandler } from './TagHandler';

export interface FormatContext {
    tagHandlers: Record<string, TagHandler>;

    blockFormat: ContentModelParagraphFormat;
    segmentFormat: ContentModelSegmentFormat;
    isInSelection: boolean;

    isSelectionCollapsed?: boolean;
    startContainer?: Node;
    endContainer?: Node;
    startOffset?: number;
    endOffset?: number;
}
