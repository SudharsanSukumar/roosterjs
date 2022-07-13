import { ContentModelBlockType, ContentModelParagraph } from 'roosterjs-editor-types';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createParagraph(context: FormatContext, isDummy: boolean): ContentModelParagraph {
    return {
        blockType: ContentModelBlockType.Paragraph,
        segments: [],
        format: context.blockFormat,
        isDummy,
    };
}
