import { block } from './block';
import { DefaultFormatParserType } from '../types/DefaultFormatParserType';
import { i } from './i';

/**
 * @internal
 */
export const address: DefaultFormatParserType = {
    ...block,
    ...i,
};
