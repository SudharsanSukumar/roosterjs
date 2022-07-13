import { ContentModelSegmentFormat } from 'roosterjs-editor-types';

const DummySegmentFormat: Required<ContentModelSegmentFormat> = {
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

const SegmentFormatKeys = Object.keys(DummySegmentFormat) as (keyof ContentModelSegmentFormat)[];

export function areSameFormats(f1: ContentModelSegmentFormat, f2: ContentModelSegmentFormat) {
    return SegmentFormatKeys.every(k => f1[k] === f2[k]);
}
