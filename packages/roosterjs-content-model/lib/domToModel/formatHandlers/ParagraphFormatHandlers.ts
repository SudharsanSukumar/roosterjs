import { alignmentHandler } from './alignmentHandler';
import { backColorHandler } from './backColorHandler';
import { directionHandler } from './directionHandler';
import { indentationHandler } from './indentationHandler';
import { lineHeightHandler } from './lineHeightHandler';
import { marginHandler } from './marginHandler';
import { ParagraphFormatHandler } from '../../types/FormatHandler';
import { whiteSpaceHandler } from './whiteSpaceHandler';

export const ParagraphFormatHandlers: ParagraphFormatHandler[] = [
    backColorHandler,
    directionHandler,
    alignmentHandler,
    marginHandler,
    indentationHandler,
    lineHeightHandler,
    whiteSpaceHandler,
];
