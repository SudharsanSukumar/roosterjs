import { ContentModelBlockGroupBase } from './ContentModelBlockGroupBase';
import { ContentModelBlockGroupType } from '../../enum/BlockGroupType';
import type { CompatibleContentModelBlockGroupType } from '../../compatibleEnum/BlockGroupType';

/**
 * Content Model of Block Quote
 */
export interface ContentModelQuote
    extends ContentModelBlockGroupBase<
        ContentModelBlockGroupType.Quote | CompatibleContentModelBlockGroupType.Quote
    > {}
