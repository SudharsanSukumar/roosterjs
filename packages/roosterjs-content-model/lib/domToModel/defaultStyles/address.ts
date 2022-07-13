import { block } from './block';
import { DefaultFormatParserType } from '../../types/DefaultFormatParserType';
import { i } from './i';

export const address: DefaultFormatParserType = {
    ...block,
    ...i,
};
