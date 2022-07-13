import * as React from 'react';
import { SidePaneElementProps } from '../SidePaneElement';

export interface ContentModelPaneState {}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {}

export default class ContentModelPane extends React.Component<
    ContentModelPaneProps,
    ContentModelPaneState
> {
    render() {
        return <div>test</div>;
    }
}
