import { ContentModelParagraphFormat } from '../publicTypes/format/ParagraphFormat';
import { ContentModelSegmentFormat } from '../publicTypes/format/SegmentFormat';

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
