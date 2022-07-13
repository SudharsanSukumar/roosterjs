import { ContentModelParagraphFormat, ContentModelSegmentFormat } from 'roosterjs-editor-types';

export interface FormatHandlerBase<
    TFormat extends ContentModelParagraphFormat | ContentModelSegmentFormat
> {
    parse: (
        format: TFormat,
        element: HTMLElement,
        defaultStyle: Partial<CSSStyleDeclaration>
    ) => void;
    writeBack: (format: TFormat, element: HTMLElement) => void;
}

export type SegmentFormatHandler = FormatHandlerBase<ContentModelSegmentFormat>;
export type ParagraphFormatHandler = FormatHandlerBase<ContentModelParagraphFormat>;
export type FormatHandler = FormatHandlerBase<
    ContentModelParagraphFormat | ContentModelSegmentFormat
>;
