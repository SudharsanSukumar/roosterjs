import { ParagraphFormatHandler } from '../../types/internal/FormatHandler';

export const whiteSpaceHandler: ParagraphFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const whiteSpace = element.style.whiteSpace || defaultStyle.whiteSpace;

        if (whiteSpace) {
            format.whiteSpace = whiteSpace;
        }
    },
    writeBack: (format, element) => {
        if (format.whiteSpace) {
            element.style.whiteSpace = format.whiteSpace;
        }
    },
};
