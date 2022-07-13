import { ContentModelBlock, ContentModelBlockGroup } from 'roosterjs-editor-types';

/**
 * @internal
 */
export function addBlock(group: ContentModelBlockGroup, block: ContentModelBlock) {
    group.blocks.push(block);
}
