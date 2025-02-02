import * as React from 'react';
import BuildInPluginState from '../../BuildInPluginState';
import { ExperimentalFeatures } from 'roosterjs-editor-types';
import { getObjectKeys } from 'roosterjs-editor-dom';

export interface ExperimentalFeaturesProps {
    state: ExperimentalFeatures[];
    resetState: (callback: (state: BuildInPluginState) => void, resetEditor: boolean) => void;
}

const FeatureNames: Partial<Record<ExperimentalFeatures, string>> = {
    [ExperimentalFeatures.SingleDirectionResize]: 'Resize an image horizontally or vertically',
    [ExperimentalFeatures.PasteWithLinkPreview]: 'Try retrieve link preview information when paste',
    [ExperimentalFeatures.ImageRotate]: 'Rotate an inline image',
    [ExperimentalFeatures.ImageCrop]: 'Crop an inline image',
    [ExperimentalFeatures.ConvertSingleImageBody]:
        'Paste Html instead of image when Html have one Img Children (Animated Image Paste)',
    [ExperimentalFeatures.TableAlignment]:
        'Align table elements to left, center and right using setAlignment API',
    [ExperimentalFeatures.TabKeyTextFeatures]: 'Additional functionality to Tab Key',
    [ExperimentalFeatures.AdaptiveHandlesResizer]:
        ' Provide a circular resize handles that adaptive the number od handles to the size of the image',
    [ExperimentalFeatures.ListItemAlignment]:
        'Align list elements elements to left, center and right using setAlignment API',
    [ExperimentalFeatures.AutoFormatList]:
        'Trigger formatting by a especial characters. Ex: (A), 1. i).',
};

export default class ExperimentalFeaturesPane extends React.Component<
    ExperimentalFeaturesProps,
    {}
> {
    render() {
        return <>{getObjectKeys(FeatureNames).map(name => this.renderFeature(name))}</>;
    }

    private renderFeature(name: keyof typeof FeatureNames): JSX.Element {
        let checked = this.props.state.indexOf(name) >= 0;
        return (
            <div key={name}>
                <input
                    type="checkbox"
                    checked={checked}
                    id={name}
                    onChange={() => this.onClick(name)}
                />
                <label htmlFor={name}>{FeatureNames[name]}</label>
            </div>
        );
    }

    private onClick = (name: keyof typeof FeatureNames) => {
        this.props.resetState(state => {
            let checkbox = document.getElementById(name) as HTMLInputElement;
            let index = state.experimentalFeatures.indexOf(name);

            if (checkbox.checked && index < 0) {
                state.experimentalFeatures.push(name);
            } else if (!checkbox.checked && index >= 0) {
                state.experimentalFeatures.splice(index, 1);
            }
        }, true);
    };
}
