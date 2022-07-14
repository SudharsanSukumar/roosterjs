import { ContentModelBlockGroupBase } from './ContentModelBlockGroupBase';
import { ContentModelBlockGroupType } from '../../enum/BlockGroupType';
import type { CompatibleContentModelBlockGroupType } from '../../compatibleEnum/BlockGroupType';

/**
 * Content Model of Code
 */
export interface ContentModelCode
    extends ContentModelBlockGroupBase<
        ContentModelBlockGroupType.Code | CompatibleContentModelBlockGroupType.Code
    > {}
