/**
 * The format object for a paragraph in Content Model
 */
export interface ContentModelParagraphFormat {
    /**
     * Text direction
     */
    direction?: 'ltr' | 'rtl';

    /**
     * Text alignment
     */
    alignment?: 'left' | 'center' | 'right';

    /**
     * Text indentation
     */
    indentation?: string;

    /**
     * Background color
     */
    backgroundColor?: string;

    /**
     * Margin on top
     */
    marginTop?: string;

    /**
     * Margin on bottom
     */
    marginBottom?: string;

    /**
     * Margin on left
     */
    marginLeft?: string;

    /**
     * Line space
     */
    lineHeight?: string;

    /**
     * White space
     */
    whiteSpace?: string;
}
