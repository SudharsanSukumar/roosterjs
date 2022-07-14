import { ContentModelBlockGroupBase } from './ContentModelBlockGroupBase';
import { ContentModelBlockGroupType } from '../../enum/BlockGroupType';
import type { CompatibleContentModelBlockGroupType } from '../../compatibleEnum/BlockGroupType';

/**
 * Content Model of List Item
 */
export interface ContentModelListItem
    extends ContentModelBlockGroupBase<
        ContentModelBlockGroupType.ListItem | CompatibleContentModelBlockGroupType.ListItem
    > {
    /**
     * Type of this list, either ordered or unordered
     */
    listTypes: ('ordered' | 'unordered')[];
}
