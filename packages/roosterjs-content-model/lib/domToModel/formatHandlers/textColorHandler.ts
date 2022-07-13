import { SegmentFormatHandler } from '../../types/internal/FormatHandler';

export const textColorHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const textColor = element.style.color || defaultStyle.color;

        if (textColor) {
            format.color = textColor;
        }
    },
    writeBack: (format, element) => {
        if (format.color) {
            element.style.color = format.color;
        }
    },
};
