import { SegmentFormatHandler } from './FormatHandler';

/**
 * @internal
 */
export const hyperLinkHandler: SegmentFormatHandler = {
    parse: (format, element, defaultStyle) => {
        if (element.tagName == 'A') {
            const href = element.getAttribute('href');
            const target = element.getAttribute('target');

            if (href) {
                format.linkHref = href;

                if (target) {
                    format.linkTarget = target;
                }
            }
        }
    },
    writeBack: (format, element) => {
        // if (format.linkHref) {
        //     const a = wrap(element, 'A') as HTMLAnchorElement;
        //     a.href = format.linkHref;
        //     if (format.linkTarget) {
        //         a.target = format.linkTarget;
        //     }
        // }
    },
};
