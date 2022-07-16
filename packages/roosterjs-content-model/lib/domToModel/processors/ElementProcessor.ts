import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export type ElementProcessor = (
    group: ContentModelBlockGroup,
    context: FormatContext,
    element: HTMLElement,
    defaultStyle: Partial<CSSStyleDeclaration>
) => void;
