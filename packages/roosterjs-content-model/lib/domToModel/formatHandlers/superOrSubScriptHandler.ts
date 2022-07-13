import wrap from '../../domUtils/wrap';
import { SegmentFormatHandler } from '../../types/internal/FormatHandler';

export const superOrSubScriptHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const verticalAlign = element.style.verticalAlign || defaultStyle.verticalAlign;

        if (verticalAlign == 'sub') {
            format.subscript = true;
            format.superscript = false;
        } else if (verticalAlign == 'super') {
            format.superscript = true;
            format.subscript = false;
        }
    },
    writeBack: (format, element) => {
        if (format.superscript) {
            wrap(element, 'SUP');
        }

        if (format.subscript) {
            wrap(element, 'SUB');
        }
    },
};
