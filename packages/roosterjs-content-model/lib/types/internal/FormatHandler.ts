import { ContentModel_ParagraphFormat } from '../ParagraphFormat';
import { ContentModel_SegmentFormat } from '../SegmentFormat';

export interface FormatHandlerBase<
    TFormat extends ContentModel_ParagraphFormat | ContentModel_SegmentFormat
> {
    parse: (
        format: TFormat,
        element: HTMLElement,
        defaultStyle: Partial<CSSStyleDeclaration>
    ) => void;
    writeBack: (format: TFormat, element: HTMLElement) => void;
}

export type SegmentFormatHandler = FormatHandlerBase<ContentModel_SegmentFormat>;
export type ParagraphFormatHandler = FormatHandlerBase<ContentModel_ParagraphFormat>;
export type FormatHandler = FormatHandlerBase<
    ContentModel_ParagraphFormat | ContentModel_SegmentFormat
>;
