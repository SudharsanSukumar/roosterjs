import { ContentModel_BlockGroupType } from '../../types/BlockGroupType';
import { ContentModel_BlockType } from '../../types/BlockType';
import { ContentModel_GeneralBlock } from '../../types/ContentModel';
import { FormatContext } from '../../types/internal/FormatContext';

export function createGeneralBlock(
    context: FormatContext,
    element: HTMLElement
): ContentModel_GeneralBlock {
    return {
        blockType: ContentModel_BlockType.BlockGroup,
        blockGroupType: ContentModel_BlockGroupType.General,
        node: element.cloneNode(),
        blocks: [],
    };
}
