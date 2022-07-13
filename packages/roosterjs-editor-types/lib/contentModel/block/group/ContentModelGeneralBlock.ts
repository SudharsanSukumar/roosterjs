import { CompatibleContentModelBlockGroupType } from '../../../compatibleEnum/BlockGroupType';
import { ContentModelBlockGroupBase } from './ContentModelBlockGroupBase';
import { ContentModelBlockGroupType } from '../../../enum/BlockGroupType';

/**
 * Content Model for general Block element
 */
export interface ContentModelGeneralBlock
    extends ContentModelBlockGroupBase<
        ContentModelBlockGroupType.General | CompatibleContentModelBlockGroupType.General
    > {
    /**
     * A cloned copy of original HTML node that this model was created from
     */
    node: Node;
}
