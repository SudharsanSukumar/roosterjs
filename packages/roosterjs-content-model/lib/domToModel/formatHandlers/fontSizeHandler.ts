import { SegmentFormatHandler } from '../../types/internal/FormatHandler';

export const fontSizeHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const fontSize = element.style.fontSize || defaultStyle.fontSize;

        if (fontSize) {
            format.fontSize = fontSize;
        }
    },
    writeBack: (format, element) => {
        if (format.fontSize) {
            element.style.fontSize = format.fontSize;
        }
    },
};
