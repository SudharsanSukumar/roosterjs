import { block } from './block';
import { DefaultFormatParserType } from '../../types/DefaultFormatParserType';

export const center: DefaultFormatParserType = {
    ...block,
    textAlign: 'center',
};
