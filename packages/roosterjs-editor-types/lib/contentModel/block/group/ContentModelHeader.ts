import { ContentModelBlockGroupBase } from './ContentModelBlockGroupBase';
import { ContentModelBlockGroupType } from '../../../enum/BlockGroupType';
import type { CompatibleContentModelBlockGroupType } from '../../../compatibleEnum/BlockGroupType';

/**
 * Content Model of Header
 */
export interface ContentModelHeader
    extends ContentModelBlockGroupBase<
        ContentModelBlockGroupType.Header | CompatibleContentModelBlockGroupType.Header
    > {
    /**
     * Level of this header, from 1 to 6
     */
    headerLevel: number;
}
