import { block } from './block';
import { DefaultFormatParserType } from '../../types/DefaultFormatParserType';

export const p: DefaultFormatParserType = {
    ...block,
    marginTop: '1em',
    marginBottom: '1em',
};
