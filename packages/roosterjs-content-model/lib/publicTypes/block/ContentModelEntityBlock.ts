import { ContentModelBlockBase } from './ContentModelBlockBase';
import { ContentModelBlockType } from '../enum/BlockType';
import type { CompatibleContentModelBlockType } from '../compatibleEnum/BlockType';

/**
 * Content Model for Entity Block
 */
export interface ContentModelEntityBlock
    extends ContentModelBlockBase<
        ContentModelBlockType.Entity | CompatibleContentModelBlockType.Entity
    > {}
