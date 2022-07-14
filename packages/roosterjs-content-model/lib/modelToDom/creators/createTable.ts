import { ContentModelTable } from '../../publicTypes/block/ContentModelTable';
import { createBlockFromContentModel } from './createBlockFromContentModel';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function createTable(
    doc: Document,
    parent: Node,
    table: ContentModelTable,
    info: SelectionInfo
) {
    const tableNode = doc.createElement('table');
    parent.appendChild(tableNode);

    const tbody = doc.createElement('tbody');
    tableNode.appendChild(tbody);

    for (let row = 0; row < table.cells.length; row++) {
        const tr = doc.createElement('tr');
        tbody.appendChild(tr);

        for (let col = 0; col < table.cells[row].length; col++) {
            const cell = table.cells[row][col];

            if (!cell.spanAbove && !cell.spanLeft) {
                const td = doc.createElement(cell.isHeader ? 'th' : 'td');
                tr.appendChild(td);

                let rowSpan = 1;
                let colSpan = 1;

                for (; table.cells[row + rowSpan]?.[col]?.spanAbove; rowSpan++) {}
                for (; table.cells[row][col + colSpan]?.spanLeft; colSpan++) {}

                if (rowSpan > 1) {
                    td.rowSpan = rowSpan;
                }

                if (colSpan > 1) {
                    td.colSpan = colSpan;
                }

                createBlockFromContentModel(doc, td, cell, info);
            }
        }
    }
}
