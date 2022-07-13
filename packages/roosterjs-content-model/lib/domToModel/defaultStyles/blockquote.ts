import { block } from './block';
import { DefaultFormatParserType } from '../../types/DefaultFormatParserType';

export const blockquote: DefaultFormatParserType = {
    ...block,
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '40px',
    marginRight: '40px',
};
