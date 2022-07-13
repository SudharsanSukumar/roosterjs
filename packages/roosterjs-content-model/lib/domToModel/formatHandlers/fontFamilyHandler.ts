import { SegmentFormatHandler } from '../../types/FormatHandler';

export const fontFamilyHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const fontFamily = element.style.fontFamily || defaultStyle.fontFamily;

        if (fontFamily) {
            format.fontFamily = fontFamily;
        }
    },
    writeBack: (format, element) => {
        if (format.fontFamily) {
            element.style.fontFamily = format.fontFamily;
        }
    },
};
