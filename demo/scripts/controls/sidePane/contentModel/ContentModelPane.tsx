import * as React from 'react';
import { addRangeToSelection, createRange, safeInstanceOf } from 'roosterjs-editor-dom';
import { ContentModelDocument, createDOMFromContentModel } from 'roosterjs-content-model';
import { SidePaneElementProps } from '../SidePaneElement';

const styles = require('./ContentModelPane.scss');

export interface ContentModelPaneState {
    model: ContentModelDocument;
}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {
    onUpdateModel: () => ContentModelDocument;
}

export default class ContentModelPane extends React.Component<
    ContentModelPaneProps,
    ContentModelPaneState
> {
    constructor(props: ContentModelPaneProps) {
        super(props);

        this.state = {
            model: null,
        };
    }

    setContentModel(model: ContentModelDocument) {
        this.setState({
            model: model,
        });
    }

    render() {
        return this.state.model ? (
            <>
                <div>
                    <button onClick={this.onRefresh}>Refresh Content Model</button>&nbsp;
                    <button onClick={this.onCreateDOM}>Create DOM tree</button>
                </div>
                <div className={styles.contentModel}>
                    <pre>
                        {JSON.stringify(
                            this.state.model,
                            (key, value) => {
                                return safeInstanceOf(value, 'Node')
                                    ? Object.prototype.toString.apply(value)
                                    : value;
                            },
                            2
                        )}
                    </pre>
                </div>
            </>
        ) : null;
    }

    private onCreateDOM = () => {
        const [fragment, start, end] = createDOMFromContentModel(this.state.model);
        const win = window.open('about:blank');

        win.document.body.appendChild(fragment);

        const range = createRange(start, end);
        addRangeToSelection(range);
    };

    private onRefresh = () => {
        const model = this.props.onUpdateModel();
        this.setContentModel(model);
    };
}
