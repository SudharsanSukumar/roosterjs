import {
    ChangeSource,
    EditorPlugin,
    IEditor,
    Keys,
    PluginEvent,
    PluginEventType,
} from 'roosterjs-editor-types';
import {
    clearSelectedTableCells,
    findClosestElementAncestor,
    getSelectedTableCells,
    safeInstanceOf,
    VTable,
} from 'roosterjs-editor-dom';

/**
 * @internal
 * MouseUpPlugin help trigger MouseUp event even when mouse up happens outside editor
 * as long as the mouse was pressed within Editor before
 */
export default class MouseUpPlugin implements EditorPlugin {
    private editor: IEditor;
    private mouseUpEventListerAdded: boolean;
    private mouseDownX: number;
    private mouseDownY: number;

    private firstTDSelected: HTMLTableCellElement;
    private lastTDSelected: HTMLTableCellElement;
    // private firstOnMouseMove: boolean = true;

    /**
     * Get a friendly name of  this plugin
     */
    getName() {
        return 'MouseUp';
    }

    /**
     * Initialize this plugin. This should only be called from Editor
     * @param editor Editor instance
     */
    initialize(editor: IEditor) {
        this.editor = editor;
    }

    /**
     * Dispose this plugin
     */
    dispose() {
        this.removeMouseUpEventListener();
        this.editor = null;
    }

    /**
     * Handle events triggered from editor
     * @param event PluginEvent object
     */
    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.MouseDown && !this.mouseUpEventListerAdded) {
            // this.firstOnMouseMove = true;
            this.editor
                .getDocument()
                .addEventListener('mouseup', this.onMouseUp, true /*setCapture*/);
            this.editor
                .getDocument()
                .addEventListener('mousemove', this.onMouseMove, true /*setCapture*/);

            this.clearTableCellSelection();

            this.mouseUpEventListerAdded = true;
            this.mouseDownX = event.rawEvent.pageX;
            this.mouseDownY = event.rawEvent.pageY;
        } else if (
            event.eventType != PluginEventType.MouseDown &&
            event.eventType != PluginEventType.MouseUp
        ) {
            if (
                event.eventType == PluginEventType.KeyUp ||
                (event.eventType == PluginEventType.ContextMenu && event.items.length == 0) ||
                (event.eventType == PluginEventType.ContentChanged &&
                    event.source == ChangeSource.Format)
            ) {
                return;
            }

            if (!this.firstTDSelected && !this.lastTDSelected) {
                this.firstTDSelected = this.editor.getElementAtCursor('td') as HTMLTableCellElement;
            }

            const table = findClosestElementAncestor(
                this.editor.getElementAtCursor('*:last-child'),
                null,
                'Table'
            ) as HTMLTableElement;
            if (event.eventType == PluginEventType.KeyDown) {
                if (event.rawEvent.shiftKey && table) {
                    if (event.rawEvent.which == Keys.SHIFT) {
                        return;
                    }

                    if (event.rawEvent.which == Keys.LEFT) {
                        if (
                            this.lastTDSelected?.previousSibling &&
                            safeInstanceOf(
                                this.lastTDSelected.previousSibling,
                                'HTMLTableCellElement'
                            )
                        ) {
                            this.lastTDSelected = this.lastTDSelected.previousSibling;
                        } else if (
                            !this.lastTDSelected &&
                            this.firstTDSelected &&
                            this.firstTDSelected.previousSibling &&
                            safeInstanceOf(
                                this.firstTDSelected.previousSibling,
                                'HTMLTableCellElement'
                            )
                        ) {
                            this.lastTDSelected = this.firstTDSelected.previousSibling;
                        }
                    }

                    if (event.rawEvent.which == Keys.RIGHT) {
                        if (
                            this.lastTDSelected?.nextSibling &&
                            safeInstanceOf(this.lastTDSelected.nextSibling, 'HTMLTableCellElement')
                        ) {
                            this.lastTDSelected = this.lastTDSelected.nextSibling;
                        } else if (!this.lastTDSelected && this.firstTDSelected) {
                            this.lastTDSelected = this.firstTDSelected;
                        }
                    }

                    if (event.rawEvent.which == Keys.UP) {
                        const tr = this.lastTDSelected?.parentElement;
                        if (safeInstanceOf(tr, 'HTMLTableRowElement')) {
                            const previousTR = tr.previousSibling;
                            if (safeInstanceOf(previousTR, 'HTMLTableRowElement')) {
                                let lastTDIndex: number;
                                for (let index = 0; index < tr.children.length; index++) {
                                    if (tr.children[index] == this.lastTDSelected) {
                                        lastTDIndex = index;
                                        break;
                                    }
                                }

                                let newLast = previousTR.children[lastTDIndex];
                                if (safeInstanceOf(newLast, 'HTMLTableCellElement')) {
                                    this.lastTDSelected = newLast;
                                }
                            }
                        } else if (!this.lastTDSelected && this.firstTDSelected) {
                            const tr = this.firstTDSelected.parentElement;
                            if (safeInstanceOf(tr, 'HTMLTableRowElement')) {
                                const previousTR = tr.previousSibling;
                                if (safeInstanceOf(previousTR, 'HTMLTableRowElement')) {
                                    let lastTDIndex: number;
                                    for (let index = 0; index < tr.children.length; index++) {
                                        if (tr.children[index] == this.firstTDSelected) {
                                            lastTDIndex = index;
                                            break;
                                        }
                                    }

                                    let newLast = previousTR.children[lastTDIndex];
                                    if (safeInstanceOf(newLast, 'HTMLTableCellElement')) {
                                        this.lastTDSelected = newLast;
                                    }
                                }
                            }
                        }
                    }

                    if (event.rawEvent.which == Keys.DOWN) {
                        const tr = this.lastTDSelected?.parentElement;
                        if (safeInstanceOf(tr, 'HTMLTableRowElement')) {
                            const nextTR = tr.nextSibling;
                            if (safeInstanceOf(nextTR, 'HTMLTableRowElement')) {
                                let lastTDIndex: number;
                                for (let index = 0; index < tr.children.length; index++) {
                                    if (tr.children[index] == this.lastTDSelected) {
                                        lastTDIndex = index;
                                        break;
                                    }
                                }

                                let newLast = nextTR.children[lastTDIndex];
                                if (safeInstanceOf(newLast, 'HTMLTableCellElement')) {
                                    this.lastTDSelected = newLast;
                                }
                            }
                        } else if (!this.lastTDSelected && this.firstTDSelected) {
                            const tr = this.firstTDSelected.parentElement;
                            if (safeInstanceOf(tr, 'HTMLTableRowElement')) {
                                const previousTR = tr.nextSibling;
                                if (safeInstanceOf(previousTR, 'HTMLTableRowElement')) {
                                    let lastTDIndex: number;
                                    for (let index = 0; index < tr.children.length; index++) {
                                        if (tr.children[index] == this.firstTDSelected) {
                                            lastTDIndex = index;
                                            break;
                                        }
                                    }

                                    let newLast = previousTR.children[lastTDIndex];
                                    if (safeInstanceOf(newLast, 'HTMLTableCellElement')) {
                                        this.lastTDSelected = newLast;
                                    }
                                }
                            }
                        }
                    }

                    if (
                        event.rawEvent.which == Keys.PAGEUP ||
                        event.rawEvent.which == Keys.PAGEDOWN
                    ) {
                        this.v2();
                        return;
                    }

                    this.setTableSelectedRange(table);
                    return;
                }
            }
            this.clearTableCellSelection();
        }
    }

    private clearTableCellSelection() {
        if (this.editor) {
            if (this.firstTDSelected && getSelectedTableCells(this.editor).length > 0) {
                // this.editor.select(new Position(this.firstTDSelected, PositionType.Begin));
            }
            this.firstTDSelected = null;
            this.lastTDSelected = null;
            clearSelectedTableCells(this.editor);
        }
    }

    private removeMouseUpEventListener() {
        if (this.mouseUpEventListerAdded) {
            this.mouseUpEventListerAdded = false;
            this.editor.getDocument().removeEventListener('mouseup', this.onMouseUp, true);
            this.editor.getDocument().removeEventListener('mousemove', this.onMouseMove, true);
        }
    }

    private onMouseUp = (rawEvent: MouseEvent) => {
        if (this.editor) {
            this.removeMouseUpEventListener();
            this.editor.triggerPluginEvent(PluginEventType.MouseUp, {
                rawEvent,
                isClicking: this.mouseDownX == rawEvent.pageX && this.mouseDownY == rawEvent.pageY,
            });
        }
    };
    private onMouseMove = (rawEvent: MouseEvent) => {
        // if (this.editor && this.firstOnMouseMove) {
        //     const target = findClosestElementAncestor(rawEvent.target as Node, null, 'td');
        //     if (target && safeInstanceOf(target, 'HTMLTableCellElement')) {
        //         const table = findClosestElementAncestor(target, null, 'Table') as HTMLTableElement;
        //         const vTable = new VTable(table);
        //         vTable.highlightSelection(target, target);
        //         this.firstTDSelected = target;
        //         this.firstOnMouseMove = false;
        //     }
        //     return;
        // }
        // if (this.editor) {
        //     const endContainer = findClosestElementAncestor(
        //         this.editor.getSelectionRange()?.endContainer,
        //         null,
        //         'td'
        //     );
        //     let target =
        //         endContainer != this.firstTDSelected
        //             ? endContainer
        //             : findClosestElementAncestor(
        //                   this.editor.getSelectionRange()?.startContainer,
        //                   null,
        //                   'td'
        //               );
        //     const table = findClosestElementAncestor(target, null, 'Table') as HTMLTableElement;
        //     if (rawEvent.y > table?.getBoundingClientRect().bottom) {
        //         let vTable = new VTable(table);
        //         vTable.selectRows();
        //     } else if (
        //         target &&
        //         safeInstanceOf(target, 'HTMLTableCellElement') &&
        //         target != this.lastTDSelected
        //     ) {
        //         this.lastTDSelected = target;
        //         console.clear();
        //         console.log(this.firstTDSelected);
        //         console.log(this.lastTDSelected);
        //         this.setTableSelectedRange(table);
        //     }
        // }
        if (event.target != this.lastTarget) {
            this.lastTarget = event.target;
            this.v2();
        }
    };
    private lastTarget: EventTarget;
    v2 = () => {
        clearSelectedTableCells(this.editor);
        const range = this.editor.getSelectionTraverser();

        let currentElement = range.currentBlockElement;
        let table: HTMLTableElement;
        while (range.currentBlockElement) {
            currentElement = range.currentBlockElement;
            range.getNextBlockElement();

            let element = currentElement.collapseToSingleElement();
            if (safeInstanceOf(element, 'HTMLTableCellElement')) {
                let tempTable = findClosestElementAncestor(
                    element,
                    null,
                    'table'
                ) as HTMLTableElement;

                if (tempTable && tempTable != table) {
                    if (table) {
                        this.setTableSelectedRange(table);
                    }
                    table = tempTable;
                    this.firstTDSelected = element;
                } else {
                    this.lastTDSelected = element;
                }

                if (range.currentBlockElement == currentElement) {
                    this.setTableSelectedRange(table);
                    break;
                }
            } else {
                if (table) {
                    this.setTableSelectedRange(table);
                }
            }

            if (range.currentBlockElement == currentElement) {
                break;
            }
        }
    };

    setTableSelectedRange = (table: HTMLTableElement) => {
        let vTable = new VTable(table);
        vTable.highlightSelection(this.firstTDSelected, this.lastTDSelected);
    };
}
