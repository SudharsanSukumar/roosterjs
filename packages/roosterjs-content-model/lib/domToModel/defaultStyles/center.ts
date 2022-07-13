import { block } from './block';
import { DefaultFormatParserType } from '../../types/internal/DefaultFormatParserType';

export const center: DefaultFormatParserType = {
    ...block,
    textAlign: 'center',
};
