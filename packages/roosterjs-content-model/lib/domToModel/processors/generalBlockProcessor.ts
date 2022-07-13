import { addBlock } from '../utils/addBlock';
import { containerProcessor } from './containerProcessor';
import { createGeneralBlock } from '../creators/createGeneralBlock';
import { ElementProcessor } from '../../types/ElementProcessor';

export const generalBlockProcessor: ElementProcessor = (group, context, element, defaultStyle) => {
    const block = createGeneralBlock(context, element);
    const originalBlockFormat = context.blockFormat;
    const originalSegmentFormat = context.segmentFormat;

    context.blockFormat = {};
    context.segmentFormat = {};

    addBlock(group, block);
    containerProcessor(block, element, context);

    context.blockFormat = originalBlockFormat;
    context.segmentFormat = originalSegmentFormat;
};
