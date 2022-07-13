import { ContentModelBlockGroup } from 'roosterjs-editor-types';
import { FormatContext } from './FormatContext';

export type ElementProcessor = (
    group: ContentModelBlockGroup,
    context: FormatContext,
    element: HTMLElement,
    defaultStyle: Partial<CSSStyleDeclaration>
) => void;
