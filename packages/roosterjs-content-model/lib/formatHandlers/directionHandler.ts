import { ParagraphFormatHandler } from './FormatHandler';

/**
 * @internal
 */
export const directionHandler: ParagraphFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const dir = element.style.direction || element.dir || defaultStyle.direction;

        if (dir) {
            format.direction = dir == 'rtl' ? 'rtl' : 'ltr';
        }
    },
    writeBack: (format, element) => {
        if (format.direction) {
            element.style.direction = format.direction;
        }
    },
};
