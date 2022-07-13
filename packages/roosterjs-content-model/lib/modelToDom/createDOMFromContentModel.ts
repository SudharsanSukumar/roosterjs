import { ContentModelDocument, NodePosition, NodeType } from 'roosterjs-editor-types';
import { createBlockFromContentModel } from './creators/createBlockFromContentModel';
import { getSelectionPosition } from './utils/getSelectionPosition';
import { isNodeOfType } from '../domUtils/isNodeOfType';
import { optimize } from './optimize/optimize';
import { SelectionInfo } from './types/SelectionInfo';

/**
 * Create DOM tree from Content Model
 * @param model The root of Content Model
 * @param optimizeLevel Optimization level, @default 2
 * @returns A DocumentFragment of DOM tree from the Content Model
 */
export default function createDOMFromContentModel(
    model: ContentModelDocument,
    optimizeLevel: number = 2
): [DocumentFragment, NodePosition | undefined, NodePosition | undefined] {
    const fragment = model.document.createDocumentFragment();
    const info: SelectionInfo = {
        context: {
            currentBlockNode: null,
            currentSegmentNode: null,
        },
    };

    createBlockFromContentModel(model.document, fragment, model, info);

    if (info.start && !info.end) {
        info.end = getSelectionPosition(info.context);
    }

    if (isNodeOfType(info.start?.node, NodeType.DocumentFragment)) {
        info.start = info.start?.normalize();
    }

    if (isNodeOfType(info.end?.node, NodeType.DocumentFragment)) {
        info.end = info.end?.normalize();
    }

    optimize(fragment, optimizeLevel);

    return [fragment, info.start, info.end];
}
