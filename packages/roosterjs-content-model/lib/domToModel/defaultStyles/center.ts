import { block } from './block';
import { DefaultFormatParserType } from './DefaultFormatParserType';

/**
 * @internal
 */
export const center: DefaultFormatParserType = {
    ...block,
    textAlign: 'center',
};
