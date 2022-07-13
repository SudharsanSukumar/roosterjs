import wrap from '../../domUtils/wrap';
import { SegmentFormatHandler } from '../../types/FormatHandler';

export const strikeHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const textDecoration = element.style.textDecoration || defaultStyle.textDecoration;

        if (textDecoration?.indexOf('line-through')! >= 0) {
            format.strikethrough = true;
        }
    },
    writeBack: (format, element) => {
        if (format.strikethrough) {
            wrap(element, 'STRIKE');
        }
    },
};
