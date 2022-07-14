import { block } from './block';
import { DefaultFormatParserType } from '../types/DefaultFormatParserType';

/**
 * @internal
 */
export const pre: DefaultFormatParserType = {
    ...block,
    whiteSpace: 'pre',
};
