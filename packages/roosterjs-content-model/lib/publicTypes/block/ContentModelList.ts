import { ContentModelBlockBase } from './ContentModelBlockBase';
import { ContentModelBlockType } from '../enum/BlockType';
import { ContentModelListItem } from './group/ContentModelListItem';
import type { CompatibleContentModelBlockType } from '../compatibleEnum/BlockType';

/**
 * Content Model for List
 */
export interface ContentModelList
    extends ContentModelBlockBase<
        ContentModelBlockType.List | CompatibleContentModelBlockType.List
    > {
    /**
     * items of this list
     */
    listItems: ContentModelListItem[];
}
