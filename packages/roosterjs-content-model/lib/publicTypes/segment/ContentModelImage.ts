import { ContentModelSegmentBase } from './ContentModelSegmentBase';
import { ContentModelSegmentType } from '../enum/SegmentType';
import type { CompatibleContentModelSegmentType } from '../compatibleEnum/SegmentType';

/**
 * Content Model of Image
 */
export interface ContentModelImage
    extends ContentModelSegmentBase<
        ContentModelSegmentType.Image | CompatibleContentModelSegmentType.Image
    > {
    /**
     * src of this image
     */
    src: string;

    /**
     * Alternate text of this image
     */
    alterText?: string;
}
