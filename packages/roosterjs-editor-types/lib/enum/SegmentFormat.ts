export interface ContentModelSegmentFormat {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    superscript?: boolean;
    subscript?: boolean;
    strikethrough?: boolean;

    fontFamily?: string;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;

    linkHref?: string;
    linkTarget?: string;
}
