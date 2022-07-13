import wrap from '../../domUtils/wrap';
import { SegmentFormatHandler } from '../../types/FormatHandler';

export const italicHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const fontStyle = element.style.fontStyle || defaultStyle.fontStyle;

        if (fontStyle == 'italic' || fontStyle == 'oblique') {
            format.italic = true;
        } else if (fontStyle == 'initial' || fontStyle == 'normal') {
            format.italic = false;
        }
    },
    writeBack: (format, element) => {
        if (format.italic) {
            wrap(element, 'I');
        }
    },
};
