import { ContentModelSegmentBase } from './ContentModelSegmentBase';
import { ContentModelSegmentType } from '../../enum/SegmentType';
import type { CompatibleContentModelSegmentType } from '../../compatibleEnum/SegmentType';

/**
 * Content Model of Entity Segment
 */
export interface ContentModelEntitySegment
    extends ContentModelSegmentBase<
        ContentModelSegmentType.Entity | CompatibleContentModelSegmentType.Entity
    > {}
