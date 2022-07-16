import * as containerProcessor from '../../../lib/domToModel/processors/containerProcessor';
import * as createGeneralSegment from '../../../lib/domToModel/creators/createGeneralSegment';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelGeneralSegment } from '../../../lib/publicTypes/segment/ContentModelGeneralSegment';
import { ContentModelSegmentType } from '../../../lib/publicTypes/enum/SegmentType';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { FormatContext } from '../../../lib/domToModel/types/FormatContext';
import { generalSegmentProcessor } from '../../../lib/domToModel/processors/generalSegmentProcessor';

const formatContext: FormatContext = { blockFormat: {}, segmentFormat: {}, isInSelection: false };

describe('generalSegmentProcessor', () => {
    beforeEach(() => {
        spyOn(containerProcessor, 'containerProcessor');
    });

    it('Process a SPAN element', () => {
        const doc = createContentModelDocument(document);
        const span = document.createElement('span');
        const segment: ContentModelGeneralSegment = {
            segmentType: ContentModelSegmentType.General,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            node: span,
            blocks: [],
            format: {},
        };

        spyOn(createGeneralSegment, 'createGeneralSegment').and.returnValue(segment);

        generalSegmentProcessor(doc, formatContext, span, {});

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [
                {
                    blockType: ContentModelBlockType.Paragraph,
                    isDummy: true,
                    segments: [segment],
                    format: {},
                },
            ],
            document: document,
        });
        expect(createGeneralSegment.createGeneralSegment).toHaveBeenCalledTimes(1);
        expect(createGeneralSegment.createGeneralSegment).toHaveBeenCalledWith(formatContext, span);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(1);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledWith(
            segment,
            span,
            formatContext
        );
    });
});
