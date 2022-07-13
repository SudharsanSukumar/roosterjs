import * as React from 'react';
import { ContentModelDocument } from 'roosterjs-editor-types';
import { safeInstanceOf } from 'roosterjs-editor-dom';
import { SidePaneElementProps } from '../SidePaneElement';

export interface ContentModelPaneState {
    model: ContentModelDocument;
}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {}

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
        ) : null;
    }
}
