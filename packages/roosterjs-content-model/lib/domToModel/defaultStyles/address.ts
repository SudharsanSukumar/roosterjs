import { block } from './block';
import { DefaultFormatParserType } from '../../types/internal/DefaultFormatParserType';
import { i } from './i';

export const address: DefaultFormatParserType = {
    ...block,
    ...i,
};
