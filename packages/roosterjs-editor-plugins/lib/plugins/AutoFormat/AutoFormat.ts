import {
    ChangeSource,
    EditorPlugin,
    IEditor,
    PluginEvent,
    PluginEventType,
    PositionType,
} from 'roosterjs-editor-types';

const specialCharacters = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;

/**
 * Automatically transform -- into hyphen, if typed between two words.
 */
export default class AutoFormat implements EditorPlugin {
    private editor: IEditor;
    private lastKeyTyped: string;

    /**
     * Get a friendly name of this plugin
     */
    getName() {
        return 'AutoFormat';
    }

    /**
     * Initialize this plugin
     * @param editor The editor instance
     */
    initialize(editor: IEditor) {
        this.editor = editor;
    }

    /**
     * Dispose this plugin
     */
    dispose() {
        this.editor = null;
    }

    /**
     * Handle events triggered from editor
     * @param event PluginEvent object
     */
    onPluginEvent(event: PluginEvent) {
        if (
            event.eventType === PluginEventType.ContentChanged ||
            event.eventType === PluginEventType.MouseDown ||
            event.eventType === PluginEventType.MouseUp
        ) {
            this.lastKeyTyped = '';
        }

        if (event.eventType === PluginEventType.KeyDown) {
            const keyTyped = event.rawEvent.key;

            if (keyTyped.length > 1) {
                this.lastKeyTyped = '';
            }

            if (
                this.lastKeyTyped === '-' &&
                !specialCharacters.test(keyTyped) &&
                keyTyped !== ' ' &&
                keyTyped !== '-'
            ) {
                const searcher = this.editor.getContentSearcherOfCursor(event);
                const textBeforeCursor = searcher.getSubStringBefore(3);
                const dashes = searcher.getSubStringBefore(2);
                const isPrecededByADash = textBeforeCursor[0] === '-';
                const isPrecededByASpace = textBeforeCursor[0] === ' ';
                if (
                    isPrecededByADash ||
                    isPrecededByASpace ||
                    specialCharacters.test(textBeforeCursor[0]) ||
                    dashes !== '--'
                ) {
                    return;
                }

                const textRange = searcher.getRangeFromText(dashes, true /* exactMatch */);
                const nodeHyphen = document.createTextNode('—');
                this.editor.addUndoSnapshot(
                    () => {
                        textRange.deleteContents();
                        textRange.insertNode(nodeHyphen);
                        this.editor.select(nodeHyphen, PositionType.End);
                    },
                    ChangeSource.Format /*changeSource*/,
                    true /*canUndoByBackspace*/,
                    { formatApiName: 'autoHyphen' }
                );

                //After the substitution the last key typed needs to be cleaned
                this.lastKeyTyped = '';
            } else {
                this.lastKeyTyped = keyTyped;
            }
        }
    }
}
