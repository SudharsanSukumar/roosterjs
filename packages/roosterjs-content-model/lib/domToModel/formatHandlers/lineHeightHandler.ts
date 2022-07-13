import { ParagraphFormatHandler } from '../../types/internal/FormatHandler';

export const lineHeightHandler: ParagraphFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const lineHeight = element.style.lineHeight || defaultStyle.lineHeight;

        if (lineHeight) {
            format.lineHeight = lineHeight;
        }
    },
    writeBack: (format, element) => {
        if (format.lineHeight) {
            element.style.lineHeight = format.lineHeight;
        }
    },
};
