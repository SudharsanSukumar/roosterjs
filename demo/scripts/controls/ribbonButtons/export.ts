import { RibbonButton } from 'roosterjs-react';

/**
 * Key of localized strings of Zoom button
 */
export type ExportButtonStringKey = 'buttonNameExport';

/**
 * "Export content" button on the format ribbon
 */
export const exportContent: RibbonButton<ExportButtonStringKey> = {
    key: 'buttonNameExport',
    unlocalizedText: 'Export',
    iconName: 'Export',
    flipWhenRtl: true,
    onClick: editor => {
        const win = editor.getDocument().defaultView.open();
        win.document.write(editor.getContent());
    },
};
