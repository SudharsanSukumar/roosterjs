import { DefaultFormatParserType } from './DefaultFormatParserType';
import { ElementProcessor } from './ElementProcessor';

export interface TagHandler {
    style: DefaultFormatParserType;
    processor: ElementProcessor;
}
