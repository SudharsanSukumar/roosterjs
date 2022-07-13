import { ContentModel_ParagraphFormat } from '../ParagraphFormat';
import { ContentModel_SegmentFormat } from '../SegmentFormat';
import { TagHandler } from './TagHandler';

export interface FormatContext {
    tagHandlers: Record<string, TagHandler>;

    blockFormat: ContentModel_ParagraphFormat;
    segmentFormat: ContentModel_SegmentFormat;
    isInSelection: boolean;

    isSelectionCollapsed?: boolean;
    startContainer?: Node;
    endContainer?: Node;
    startOffset?: number;
    endOffset?: number;
}
