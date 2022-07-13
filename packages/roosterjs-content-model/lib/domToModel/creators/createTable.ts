import { ContentModelBlockType, ContentModelTable } from 'roosterjs-editor-types';
import { FormatContext } from '../../types/FormatContext';

export function createTable(context: FormatContext, table: HTMLTableElement): ContentModelTable {
    return {
        blockType: ContentModelBlockType.Table,
        cells: Array.from(table.rows).map(_ => []),
    };
}
