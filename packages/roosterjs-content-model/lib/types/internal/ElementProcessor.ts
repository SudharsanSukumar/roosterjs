import { ContentModel_BlockGroup } from '../ContentModel';
import { FormatContext } from './FormatContext';

export type ElementProcessor = (
    group: ContentModel_BlockGroup,
    context: FormatContext,
    element: HTMLElement,
    defaultStyle: Partial<CSSStyleDeclaration>
) => void;
