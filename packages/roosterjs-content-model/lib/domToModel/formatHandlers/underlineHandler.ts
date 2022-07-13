import wrap from '../../domUtils/wrap';
import { SegmentFormatHandler } from '../../types/internal/FormatHandler';

export const underlineHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const textDecoration = element.style.textDecoration || defaultStyle.textDecoration;

        if (textDecoration?.indexOf('underline')! >= 0) {
            format.underline = true;
        }
    },
    writeBack: (format, element) => {
        if (format.underline) {
            wrap(element, 'U');
        }
    },
};
