import { containerProcessor } from './processors/containerProcessor';
import { FormatContext } from './types/FormatContext';
import {
    ContentModelBlockGroupType,
    ContentModelBlockType,
    ContentModelSegmentType,
    ContentModelBlock,
    ContentModelBlockGroup,
    ContentModelDocument,
    ContentModelSegment,
} from 'roosterjs-editor-types';

/**
 * Create Content Model from DOM node
 * @param root Root node of the DOM tree. This node itself will not be included in the Content Model
 * @param range Selection range
 * @returns A Content Model of the given root and selection
 */
export default function createContentModelFromDOM(
    root: Node,
    range: Range | null
): ContentModelDocument {
    const context = createFormatContext(range);
    const model = createEmptyModel(root.ownerDocument!);

    containerProcessor(model, root, context);
    normalizeModel(model);

    return model;
}

function createEmptyModel(doc: Document): ContentModelDocument {
    return {
        blockGroupType: ContentModelBlockGroupType.Document,
        blockType: ContentModelBlockType.BlockGroup,
        blocks: [],
        document: doc,
    };
}

function createFormatContext(range: Range | null): FormatContext {
    const context: FormatContext = {
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

function normalizeModel(group: ContentModelBlockGroup) {
    for (let i = group.blocks.length - 1; i >= 0; i--) {
        const block = group.blocks[i];

        switch (block.blockType) {
            case ContentModelBlockType.BlockGroup:
                normalizeModel(block);
                break;
            case ContentModelBlockType.List:
                for (let j = 0; j < block.listItems.length; j++) {
                    normalizeModel(block.listItems[j]);
                }
                break;
            case ContentModelBlockType.Paragraph:
                for (let j = block.segments.length - 1; j >= 0; j--) {
                    if (isEmptySegment(block.segments[j])) {
                        block.segments.splice(j, 1);
                    }
                }
                break;
            case ContentModelBlockType.Table:
                for (let r = 0; r < block.cells.length; r++) {
                    for (let c = 0; c < block.cells[r].length; c++) {
                        normalizeModel(block.cells[r][c]);
                    }
                }
                break;
        }

        if (isEmptyBlock(block)) {
            group.blocks.splice(i, 1);
        }
    }
}

function isEmptySegment(segment: ContentModelSegment) {
    return (
        segment.segmentType == ContentModelSegmentType.Text &&
        (!segment.text || /^[\r\n]*$/.test(segment.text))
    );
}

function isEmptyBlock(block: ContentModelBlock) {
    return block.blockType == ContentModelBlockType.Paragraph && block.segments.length == 0;
}
