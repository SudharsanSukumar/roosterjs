import { ContentModel_Block, ContentModel_BlockGroup } from '../../types/ContentModel';

export function addBlock(group: ContentModel_BlockGroup, block: ContentModel_Block) {
    group.blocks.push(block);
}
