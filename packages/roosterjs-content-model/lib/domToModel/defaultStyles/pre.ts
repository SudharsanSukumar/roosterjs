import { block } from './block';
import { DefaultFormatParserType } from '../../types/DefaultFormatParserType';

export const pre: DefaultFormatParserType = {
    ...block,
    whiteSpace: 'pre',
};
