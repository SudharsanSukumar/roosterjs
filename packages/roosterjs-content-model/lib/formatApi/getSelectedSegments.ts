import {
    ContentModelBlockType,
    ContentModelBlockGroup,
    ContentModelDocument,
    ContentModelParagraph,
    ContentModelSegment,
} from 'roosterjs-editor-types';

/**
 * Get all selected segments to do formatting
 * @param model The root of a Content Model
 * @returns An array of selected segments
 */
export default function getSelectedSegments(model: ContentModelDocument): ContentModelSegment[] {
    const segments: ContentModelSegment[] = [];

    traverse(model, paragraph => {
        paragraph.segments.forEach(segment => {
            if (segment.isSelected) {
                segments.push(segment);
            }
        });
    });

    return segments;
}

function traverse(
    group: ContentModelBlockGroup,
    callback: (paragraph: ContentModelParagraph) => void
) {
    group.blocks.forEach(block => {
        switch (block.blockType) {
            case ContentModelBlockType.BlockGroup:
                traverse(block, callback);
                break;

            case ContentModelBlockType.List:
                block.listItems.forEach(item => traverse(item, callback));
                break;

            case ContentModelBlockType.Table:
                block.cells.forEach(cells => {
                    cells.forEach(cell => traverse(cell, callback));
                });
                break;

            case ContentModelBlockType.Paragraph:
                callback(block);
                break;
        }
    });
}
