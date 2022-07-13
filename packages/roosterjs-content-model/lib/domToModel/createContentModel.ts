import { address } from './defaultStyles/address';
import { b } from './defaultStyles/b';
import { block } from './defaultStyles/block';
import { blockquote } from './defaultStyles/blockquote';
import { brProcessor } from './processors/brProcessor';
import { center } from './defaultStyles/center';
import { containerProcessor } from './processors/containerProcessor';
import { ContentModel_BlockGroupType } from '../types/BlockGroupType';
import { ContentModel_BlockType } from '../types/BlockType';
import { ContentModel_SegmentType } from '../types/SegmentType';
import { dd } from './defaultStyles/dd';
import { DefaultFormatParserType } from '../types/internal/DefaultFormatParserType';
import { dl } from './defaultStyles/dl';
import { ElementProcessor } from '../types/internal/ElementProcessor';
import { font } from './defaultStyles/font';
import { FormatContext } from '../types/internal/FormatContext';
import { generalProcessor } from './processors/generalProcessor';
import { i } from './defaultStyles/i';
import { imageProcessor } from './processors/imageProcessor';
import { inline } from './defaultStyles/inline';
import { li } from './defaultStyles/li';
import { p } from './defaultStyles/p';
import { pre } from './defaultStyles/pre';
import { strike } from './defaultStyles/strike';
import { sub } from './defaultStyles/sub';
import { sup } from './defaultStyles/sup';
import { tableProcessor } from './processors/tableProcessor';
import { TagHandler } from '../types/internal/TagHandler';
import { u } from './defaultStyles/u';
import {
    ContentModel_Block,
    ContentModel_BlockGroup,
    ContentModel_Document,
    ContentModel_Segment,
} from '../types/ContentModel';

export default function createContentModel(root: Node, range: Range | null): ContentModel_Document {
    const context = createFormatContext(range);
    const model = createEmptyModel(root.ownerDocument!);

    containerProcessor(model, root, context);
    normalizeModel(model);

    return model;
}

const TagHandlerMap: Record<string, TagHandler> = {
    A: createTagHandler(inline, generalProcessor),
    ADDRESS: createTagHandler(address, generalProcessor),
    ARTICLE: createTagHandler(block, generalProcessor),
    ASIDE: createTagHandler(block, generalProcessor),
    B: createTagHandler(b, generalProcessor),
    BODY: createTagHandler(block, generalProcessor), // TODO
    BLOCKQUOTE: createTagHandler(blockquote, generalProcessor), // TODO
    BR: createTagHandler(block, brProcessor),
    CENTER: createTagHandler(center, generalProcessor),
    CODE: createTagHandler(inline, generalProcessor), // TODO
    DIV: createTagHandler(block, generalProcessor),
    DD: createTagHandler(dd, generalProcessor), // TODO
    DL: createTagHandler(dl, generalProcessor), // TODO
    DT: createTagHandler(block, generalProcessor), // TODO
    EM: createTagHandler(i, generalProcessor),
    FONT: createTagHandler(font, generalProcessor),
    FIELDSET: createTagHandler(block, generalProcessor), // TODO
    FIGURE: createTagHandler(block, generalProcessor), // TODO
    FIGCAPTION: createTagHandler(block, generalProcessor), // TODO
    FOOTER: createTagHandler(block, generalProcessor), // TODO
    FORM: createTagHandler(block, generalProcessor), // TODO
    I: createTagHandler(i, generalProcessor),
    IMG: createTagHandler(inline, imageProcessor),
    H1: createTagHandler(block, generalProcessor), // TODO
    H2: createTagHandler(block, generalProcessor), // TODO
    H3: createTagHandler(block, generalProcessor), // TODO
    H4: createTagHandler(block, generalProcessor), // TODO
    H5: createTagHandler(block, generalProcessor), // TODO
    H6: createTagHandler(block, generalProcessor), // TODO
    HEADER: createTagHandler(block, generalProcessor), // TODO
    HR: createTagHandler(block, generalProcessor), // TODO
    LI: createTagHandler(li, generalProcessor), // TODO
    MAIN: createTagHandler(block, generalProcessor), // TODO
    NAV: createTagHandler(block, generalProcessor), // TODO
    OL: createTagHandler(block, generalProcessor), // TODO
    P: createTagHandler(p, generalProcessor),
    PRE: createTagHandler(pre, generalProcessor),
    S: createTagHandler(strike, generalProcessor),
    SECTION: createTagHandler(block, generalProcessor),
    SPAN: createTagHandler(inline, generalProcessor),
    STRIKE: createTagHandler(strike, generalProcessor),
    STRONG: createTagHandler(b, generalProcessor),
    SUB: createTagHandler(sub, generalProcessor),
    SUP: createTagHandler(sup, generalProcessor),
    TABLE: createTagHandler(block, tableProcessor),
    TD: createTagHandler(block, generalProcessor), // TODO
    TBODY: createTagHandler(block, generalProcessor), // TODO
    TFOOT: createTagHandler(block, generalProcessor), // TODO
    TH: createTagHandler(block, generalProcessor), // TODO
    U: createTagHandler(u, generalProcessor),
    UL: createTagHandler(block, generalProcessor), // TODO
    VIDEO: createTagHandler(block, generalProcessor), // TODO
};

function createEmptyModel(doc: Document): ContentModel_Document {
    return {
        blockGroupType: ContentModel_BlockGroupType.Document,
        blockType: ContentModel_BlockType.BlockGroup,
        blocks: [],
        document: doc,
    };
}

function createFormatContext(range: Range | null): FormatContext {
    const context: FormatContext = {
        tagHandlers: TagHandlerMap,
        blockFormat: {},
        segmentFormat: {},
        isInSelection: false,
    };

    if (range) {
        context.startContainer = range.startContainer;
        context.startOffset = range.startOffset;
        context.endContainer = range.endContainer;
        context.endOffset = range.endOffset;
        context.isSelectionCollapsed = range.collapsed;
    }

    return context;
}

function normalizeModel(group: ContentModel_BlockGroup) {
    for (let i = group.blocks.length - 1; i >= 0; i--) {
        const block = group.blocks[i];

        switch (block.blockType) {
            case ContentModel_BlockType.BlockGroup:
                normalizeModel(block);
                break;
            // case ContentModel_BlockType.List:
            //     for (let j = 0; j < block.listItems.length; j++) {
            //         normalizeModel(block.listItems[j]);
            //     }
            //     break;
            case ContentModel_BlockType.Paragraph:
                for (let j = block.segments.length - 1; j >= 0; j--) {
                    if (isEmptySegment(block.segments[j])) {
                        block.segments.splice(j, 1);
                    }
                }
                break;
            // case ContentModel_BlockType.Table:
            //     for (let r = 0; r < block.cells.length; r++) {
            //         for (let c = 0; c < block.cells[r].length; c++) {
            //             normalizeModel(block.cells[r][c]);
            //         }
            //     }
            //     break;
        }

        if (isEmptyBlock(block)) {
            group.blocks.splice(i, 1);
        }
    }
}

function isEmptySegment(segment: ContentModel_Segment) {
    return (
        segment.segmentType == ContentModel_SegmentType.Text &&
        (!segment.text || /^[\r\n]*$/.test(segment.text))
    );
}

function isEmptyBlock(block: ContentModel_Block) {
    return block.blockType == ContentModel_BlockType.Paragraph && block.segments.length == 0;
}

function createTagHandler(style: DefaultFormatParserType, processor: ElementProcessor): TagHandler {
    return {
        style,
        processor,
    };
}
