import { block } from './block';
import { DefaultFormatParserType } from '../types/DefaultFormatParserType';

/**
 * @internal
 */
export const center: DefaultFormatParserType = {
    ...block,
    textAlign: 'center',
};
