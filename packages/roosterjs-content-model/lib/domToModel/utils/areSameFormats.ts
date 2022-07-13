import { ContentModel_SegmentFormat } from '../../types/SegmentFormat';

const DummySegmentFormat: Required<ContentModel_SegmentFormat> = {
    bold: false,
    italic: false,
    underline: false,
    subscript: false,
    superscript: false,
    strikethrough: false,
    fontFamily: '',
    fontSize: '',
    color: '',
    backgroundColor: '',
    linkHref: '',
    linkTarget: '',
};

const SegmentFormatKeys = Object.keys(DummySegmentFormat) as (keyof ContentModel_SegmentFormat)[];

export function areSameFormats(f1: ContentModel_SegmentFormat, f2: ContentModel_SegmentFormat) {
    return SegmentFormatKeys.every(k => f1[k] === f2[k]);
}
