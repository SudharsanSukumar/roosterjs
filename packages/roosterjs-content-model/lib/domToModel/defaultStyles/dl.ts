import { block } from './block';
import { DefaultFormatParserType } from './DefaultFormatParserType';

/**
 * @internal
 */
export const dl: DefaultFormatParserType = {
    ...block,
    marginTop: '1em',
    marginBottom: '1em',
};
