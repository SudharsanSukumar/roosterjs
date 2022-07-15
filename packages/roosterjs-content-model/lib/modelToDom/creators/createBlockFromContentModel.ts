import { ContentModelBlock } from '../../publicTypes/block/ContentModelBlock';
import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { createParagraph } from './createParagraph';
import { createTable } from './createTable';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function createBlockFromContentModel(
    doc: Document,
    parent: Node,
    block: ContentModelBlock,
    info: SelectionInfo
) {
    switch (block.blockType) {
        case ContentModelBlockType.List:
            break;

        case ContentModelBlockType.Table:
            createTable(doc, parent, block, info);
            break;

        case ContentModelBlockType.BlockGroup:
            let newParent = parent;

            switch (block.blockGroupType) {
                case ContentModelBlockGroupType.General:
                    newParent = block.node.cloneNode();
                    parent.appendChild(newParent);
                    break;
                default:
                    break;
            }

            block.blocks.forEach(childBlock =>
                createBlockFromContentModel(doc, newParent, childBlock, info)
            );

            break;
        case ContentModelBlockType.Paragraph:
            createParagraph(doc, parent, block, info);
            break;
    }
}
