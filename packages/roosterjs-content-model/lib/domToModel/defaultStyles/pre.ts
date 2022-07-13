import { block } from './block';
import { DefaultFormatParserType } from '../../types/internal/DefaultFormatParserType';

export const pre: DefaultFormatParserType = {
    ...block,
    whiteSpace: 'pre',
};
