import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createParagraph(context: FormatContext, isDummy?: boolean): ContentModelParagraph {
    const result: ContentModelParagraph = {
        blockType: ContentModelBlockType.Paragraph,
        segments: [],
        format: context.blockFormat,
    };

    if (isDummy) {
        result.isDummy = true;
    }

    return result;
}
