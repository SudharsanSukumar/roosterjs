import { ContentModel_BlockType } from '../../types/BlockType';
import { ContentModel_Paragraph } from '../../types/ContentModel';
import { FormatContext } from '../../types/internal/FormatContext';

export function createParagraph(context: FormatContext, isDummy: boolean): ContentModel_Paragraph {
    return {
        blockType: ContentModel_BlockType.Paragraph,
        segments: [],
        format: context.blockFormat,
        isDummy,
    };
}
