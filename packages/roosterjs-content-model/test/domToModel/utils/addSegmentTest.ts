import { addBlock } from '../../../lib/domToModel/utils/addBlock';
import { addSegment } from '../../../lib/domToModel/utils/addSegment';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelGeneralBlock } from '../../../lib/publicTypes/block/group/ContentModelGeneralBlock';
import { ContentModelParagraph } from '../../../lib/publicTypes/block/ContentModelParagraph';
import { ContentModelSegmentType } from '../../../lib/publicTypes/enum/SegmentType';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { createParagraph } from '../../../lib/domToModel/creators/createParagraph';
import { createText } from '../../../lib/domToModel/creators/createText';
import { FormatContext } from '../../../lib/domToModel/types/FormatContext';

const formatContext: FormatContext = { blockFormat: {}, segmentFormat: {}, isInSelection: false };

describe('addSegment', () => {
    it('Add segment to empty document', () => {
        const doc = createContentModelDocument(document);
        const segment = createText(formatContext, 'test');

        addSegment(doc, formatContext, segment);

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [
                {
                    blockType: ContentModelBlockType.Paragraph,
                    isDummy: true,
                    segments: [
                        {
                            segmentType: ContentModelSegmentType.Text,
                            text: 'test',
                            format: {},
                        },
                    ],
                    format: {},
                },
            ],
            document: document,
        });
    });

    it('Add segment to document contains an empty paragraph', () => {
        const doc = createContentModelDocument(document);
        addBlock(doc, createParagraph(formatContext));

        const segment = createText(formatContext, 'test');

        addSegment(doc, formatContext, segment);

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [
                {
                    blockType: ContentModelBlockType.Paragraph,
                    segments: [
                        {
                            segmentType: ContentModelSegmentType.Text,
                            text: 'test',
                            format: {},
                        },
                    ],
                    format: {},
                },
            ],
            document: document,
        });
    });

    it('Add segment to document contains a paragraph with existing text', () => {
        const doc = createContentModelDocument(document);
        const block: ContentModelParagraph = {
            blockType: ContentModelBlockType.Paragraph,
            segments: [
                {
                    segmentType: ContentModelSegmentType.Text,
                    text: 'test1',
                    format: {},
                },
            ],
            format: {},
        };
        addBlock(doc, block);

        const segment = createText(formatContext, 'test2');

        addSegment(doc, formatContext, segment);

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [
                {
                    blockType: ContentModelBlockType.Paragraph,
                    segments: [
                        {
                            segmentType: ContentModelSegmentType.Text,
                            text: 'test1',
                            format: {},
                        },
                        {
                            segmentType: ContentModelSegmentType.Text,
                            text: 'test2',
                            format: {},
                        },
                    ],
                    format: {},
                },
            ],
            document: document,
        });
    });

    it('Add segment to document contains a paragraph with other type of block', () => {
        const doc = createContentModelDocument(document);
        const div = document.createElement('div');
        const block: ContentModelGeneralBlock = {
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            blocks: [],
            node: div,
        };
        addBlock(doc, block);

        const segment = createText(formatContext, 'test');

        addSegment(doc, formatContext, segment);

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [
                block,
                {
                    blockType: ContentModelBlockType.Paragraph,
                    isDummy: true,
                    segments: [
                        {
                            segmentType: ContentModelSegmentType.Text,
                            text: 'test',
                            format: {},
                        },
                    ],
                    format: {},
                },
            ],
            document: document,
        });
    });
});
