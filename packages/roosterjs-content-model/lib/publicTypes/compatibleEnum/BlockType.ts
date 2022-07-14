/**
 * Type of Block in Content Model
 */
export enum CompatibleContentModelBlockType {
    /**
     * Represent a Block Group
     */
    BlockGroup,

    /**
     * Represent a List (OL, UL)
     */
    List,

    /**
     * Represent a Table
     */
    Table,

    /**
     * Represent a general paragraph (DIV, P, ...)
     */
    Paragraph,

    /**
     * Represents a roosterjs entity in a block
     */
    Entity,
}
