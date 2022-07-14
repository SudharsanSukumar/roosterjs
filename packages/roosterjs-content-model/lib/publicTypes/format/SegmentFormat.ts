/**
 * The format object for a segment in Content Model
 */
export interface ContentModelSegmentFormat {
    /**
     * Whether it is in bold
     */
    bold?: boolean;

    /**
     * Whether it is in italic
     */
    italic?: boolean;

    /**
     * Whether it has underline
     */
    underline?: boolean;

    /**
     * Whether it is in superscript
     */
    superscript?: boolean;

    /**
     * Whether it is in subscript
     */
    subscript?: boolean;

    /**
     * Whether it has strike through
     */
    strikethrough?: boolean;

    /**
     * Font family
     */
    fontFamily?: string;

    /**
     * Font size
     */
    fontSize?: string;

    /**
     * Text color
     */
    color?: string;

    /**
     * Background color
     */
    backgroundColor?: string;

    /**
     * Href of a hyperlink if any
     */
    linkHref?: string;

    /**
     * Target of a hyperlink if any
     */
    linkTarget?: string;
}
