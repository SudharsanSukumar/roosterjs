import { DefaultFormatParserType } from '../types/DefaultFormatParserType';

const FontSizes = ['10px', '13px', '16px', '18px', '24px', '32px', '48px'];

function getFontSize(size: string | null) {
    const intSize = parseInt(size || '');

    if (Number.isNaN(intSize)) {
        return undefined;
    } else if (intSize < 1) {
        return FontSizes[0];
    } else if (intSize > FontSizes.length) {
        return FontSizes[FontSizes.length - 1];
    } else {
        return FontSizes[intSize - 1];
    }
}

/**
 * @internal
 */
export const font: DefaultFormatParserType = e => {
    return {
        fontFamily: e.getAttribute('face') || undefined,
        fontSize: getFontSize(e.getAttribute('size')),
        color: e.getAttribute('color') || undefined,
    };
};
