import { ContentModelBlockGroup } from 'roosterjs-editor-types';
import { FormatContext } from './FormatContext';

/**
 * @internal
 */
export type ElementProcessor = (
    group: ContentModelBlockGroup,
    context: FormatContext,
    element: HTMLElement,
    defaultStyle: Partial<CSSStyleDeclaration>
) => void;
