import { addSegment } from '../utils/addSegment';
import { createBr } from '../creators/createBr';
import { ElementProcessor } from '../../types/internal/ElementProcessor';

export const brProcessor: ElementProcessor = (group, context) => {
    addSegment(group, context, createBr(context));
};
