import { block } from './block';
import { DefaultFormatParserType } from './DefaultFormatParserType';

/**
 * @internal
 */
export const pre: DefaultFormatParserType = {
    ...block,
    whiteSpace: 'pre',
};
