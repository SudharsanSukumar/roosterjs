import { alignmentHandler } from './alignmentHandler';
import { backColorHandler } from './backColorHandler';
import { directionHandler } from './directionHandler';
import { indentationHandler } from './indentationHandler';
import { lineHeightHandler } from './lineHeightHandler';
import { marginHandler } from './marginHandler';
import { ParagraphFormatHandler } from './FormatHandler';
import { whiteSpaceHandler } from './whiteSpaceHandler';

/**
 * @internal
 */
export const ParagraphFormatHandlers: ParagraphFormatHandler[] = [
    backColorHandler,
    directionHandler,
    alignmentHandler,
    marginHandler,
    indentationHandler,
    lineHeightHandler,
    whiteSpaceHandler,
];
