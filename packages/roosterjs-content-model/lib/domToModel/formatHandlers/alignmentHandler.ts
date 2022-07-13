import { ParagraphFormatHandler } from '../../types/FormatHandler';

export const alignmentHandler: ParagraphFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const align = element.style.textAlign || defaultStyle.textAlign;

        if (align) {
            format.alignment = align == 'right' ? 'right' : align == 'center' ? 'center' : 'right';
        }
    },
    writeBack: (format, element) => {
        if (format.alignment) {
            element.style.textAlign = format.alignment;
        }
    },
};
