import { ContentModelParagraphFormat, ContentModelSegmentFormat } from 'roosterjs-editor-types';

/**
 * @internal
 */
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

/**
 * @internal
 */
export type SegmentFormatHandler = FormatHandlerBase<ContentModelSegmentFormat>;

/**
 * @internal
 */
export type ParagraphFormatHandler = FormatHandlerBase<ContentModelParagraphFormat>;

/**
 * @internal
 */
export type FormatHandler = FormatHandlerBase<
    ContentModelParagraphFormat | ContentModelSegmentFormat
>;
