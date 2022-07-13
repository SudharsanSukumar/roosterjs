import { FormatContext } from '../../types/FormatContext';
import {
    ContentModelBlockGroupType,
    ContentModelBlockType,
    ContentModelTableCell,
} from 'roosterjs-editor-types';

export function createTableCell(
    context: FormatContext,
    colSpan: number,
    rowSpan: number,
    isHeader: boolean
): ContentModelTableCell {
    return {
        blockGroupType: ContentModelBlockGroupType.TableCell,
        blockType: ContentModelBlockType.BlockGroup,
        blocks: [],
        // td: hasTd ? td : null,
        spanLeft: colSpan > 0,
        spanAbove: rowSpan > 0,
        isHeader,
    };
}
