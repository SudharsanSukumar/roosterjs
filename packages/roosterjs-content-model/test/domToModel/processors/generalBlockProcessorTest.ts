import * as containerProcessor from '../../../lib/domToModel/processors/containerProcessor';
import * as createGeneralBlock from '../../../lib/domToModel/creators/createGeneralBlock';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelGeneralBlock } from '../../../lib/publicTypes/block/group/ContentModelGeneralBlock';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { FormatContext } from '../../../lib/domToModel/types/FormatContext';
import { generalBlockProcessor } from '../../../lib/domToModel/processors/generalBlockProcessor';

const formatContext: FormatContext = { blockFormat: {}, segmentFormat: {}, isInSelection: false };

describe('generalBlockProcessor', () => {
    beforeEach(() => {
        spyOn(containerProcessor, 'containerProcessor');
    });

    it('Process a DIV element', () => {
        const doc = createContentModelDocument(document);
        const div = document.createElement('div');
        const block: ContentModelGeneralBlock = {
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            node: div,
            blocks: [],
        };

        spyOn(createGeneralBlock, 'createGeneralBlock').and.returnValue(block);
        generalBlockProcessor(doc, formatContext, div, {});

        expect(doc).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [block],
            document: document,
        });
        expect(createGeneralBlock.createGeneralBlock).toHaveBeenCalledTimes(1);
        expect(createGeneralBlock.createGeneralBlock).toHaveBeenCalledWith(div);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(1);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledWith(
            block,
            div,
            formatContext
        );
    });
});
