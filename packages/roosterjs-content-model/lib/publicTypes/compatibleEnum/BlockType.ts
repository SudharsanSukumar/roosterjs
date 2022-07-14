/**
 * Type of Block in Content Model
 *
 * (This is a temporary file, later we will delete it and let build script generate it instead)
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
