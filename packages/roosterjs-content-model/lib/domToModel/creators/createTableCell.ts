import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelTableCell } from '../../publicTypes/block/group/ContentModelTableCell';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
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
