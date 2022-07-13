import ContentModelPane, { ContentModelPaneProps } from './ContentModelPane';
import SidePanePluginImpl from '../SidePanePluginImpl';
import { IEditor } from 'roosterjs-editor-types';
import { SidePaneElementProps } from '../SidePaneElement';

export default class ContentModelPlugin extends SidePanePluginImpl<
    ContentModelPane,
    ContentModelPaneProps
> {
    constructor() {
        super(ContentModelPane, 'contentModel', 'Content Model (Under development)');
    }

    initialize(editor: IEditor): void {
        super.initialize(editor);

        editor.getDocument().addEventListener('selectionchange', this.onSelectionChange);
    }

    dispose(): void {
        this.editor.getDocument().removeEventListener('selectionchange', this.onSelectionChange);

        super.dispose();
    }

    protected getComponentProps(baseProps: SidePaneElementProps): ContentModelPaneProps {
        return {
            ...baseProps,
            model: null,
        };
    }

    private onSelectionChange = () => {
        this.getComponent(component => {
            const model = this.editor.getContentModel();
            component.setContentModel(model);
        });
    };
}
