import { FormatHandler } from './FormatHandler';

/**
 * @internal
 */
export const backColorHandler: FormatHandler = {
    parse: (format, element, defaultStyle) => {
        const backColor = element.style.backgroundColor || defaultStyle.backgroundColor;

        if (backColor) {
            format.backgroundColor = backColor;
        }
    },
    writeBack: (format, element) => {
        if (format.backgroundColor) {
            element.style.backgroundColor = format.backgroundColor;
        }
    },
};
