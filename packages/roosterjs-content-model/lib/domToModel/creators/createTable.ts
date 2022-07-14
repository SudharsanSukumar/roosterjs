import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelTable } from '../../publicTypes/block/ContentModelTable';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createTable(context: FormatContext, table: HTMLTableElement): ContentModelTable {
    return {
        blockType: ContentModelBlockType.Table,
        cells: Array.from(table.rows).map(_ => []),
    };
}
