import { block } from './block';
import { DefaultFormatParserType } from './DefaultFormatParserType';
import { i } from './i';

/**
 * @internal
 */
export const address: DefaultFormatParserType = {
    ...block,
    ...i,
};
