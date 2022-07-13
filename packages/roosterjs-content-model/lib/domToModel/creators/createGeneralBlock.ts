import { FormatContext } from '../types/FormatContext';
import {
    ContentModelBlockGroupType,
    ContentModelBlockType,
    ContentModelGeneralBlock,
} from 'roosterjs-editor-types';

/**
 * @internal
 */
export function createGeneralBlock(
    context: FormatContext,
    element: HTMLElement
): ContentModelGeneralBlock {
    return {
        blockType: ContentModelBlockType.BlockGroup,
        blockGroupType: ContentModelBlockGroupType.General,
        node: element.cloneNode(),
        blocks: [],
    };
}
