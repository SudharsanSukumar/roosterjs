import { ParagraphFormatHandler } from '../../types/FormatHandler';

export const indentationHandler: ParagraphFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const indentation = element.style.textIndent || defaultStyle.textIndent;

        if (indentation) {
            format.indentation = indentation;
        }
    },
    writeBack: (format, element) => {
        if (format.indentation) {
            element.style.textIndent = format.indentation;
        }
    },
};
