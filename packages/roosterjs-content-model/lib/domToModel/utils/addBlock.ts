import { ContentModelBlock, ContentModelBlockGroup } from 'roosterjs-editor-types';

export function addBlock(group: ContentModelBlockGroup, block: ContentModelBlock) {
    group.blocks.push(block);
}
