import wrap from '../domUtils/wrap';
import { SegmentFormatHandler } from './FormatHandler';

/**
 * @internal
 */
export const boldHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        const fontWeight = element.style.fontWeight || defaultStyle.fontWeight || '';

        if (fontWeight == 'bold' || fontWeight == 'bolder' || parseInt(fontWeight) >= 600) {
            format.bold = true;
        } else if (
            fontWeight == 'normal' ||
            fontWeight == 'lighter' ||
            fontWeight == 'initial' ||
            parseInt(fontWeight) < 600
        ) {
            format.bold = false;
        }
    },
    writeBack: (format, element) => {
        if (format.bold) {
            wrap(element, 'B');
        }
    },
};
