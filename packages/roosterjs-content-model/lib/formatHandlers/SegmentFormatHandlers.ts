import { backColorHandler } from './backColorHandler';
import { boldHandler } from './boldHandler';
import { fontFamilyHandler } from './fontFamilyHandler';
import { fontSizeHandler } from './fontSizeHandler';
import { hyperLinkHandler } from './hyperLinkHandler';
import { italicHandler } from './italicHandler';
import { SegmentFormatHandler } from './FormatHandler';
import { strikeHandler } from './strikeHandler';
import { superOrSubScriptHandler } from './superOrSubScriptHandler';
import { textColorHandler } from './textColorHandler';
import { underlineHandler } from './underlineHandler';

// Order by frequency, from not common used to common used, for better optimization

/**
 * @internal
 */
export const SegmentFormatHandlers: SegmentFormatHandler[] = [
    superOrSubScriptHandler,
    strikeHandler,
    fontFamilyHandler,
    fontSizeHandler,
    underlineHandler,
    italicHandler,
    boldHandler,
    textColorHandler,
    backColorHandler,
    hyperLinkHandler,
];
