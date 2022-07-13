import { ContentModelBlockGroupType } from '../enum/BlockGroupType';
import { ContentModelBlockType } from '../enum/BlockType';
import { ContentModelParagraphFormat } from './ParagraphFormat';
import { ContentModelSegmentFormat } from '../enum/SegmentFormat';
import { ContentModelSegmentType } from './SegmentType';

export interface ContentModelBlockBase<T extends ContentModelBlockType> {
    blockType: T;
}

export interface ContentModelList extends ContentModelBlockBase<ContentModelBlockType.List> {
    listItems: ContentModelListItem[];
}

export interface ContentModelTable extends ContentModelBlockBase<ContentModelBlockType.Table> {
    cells: ContentModelTableCell[][];
}

export interface ContentModelParagraph
    extends ContentModelBlockBase<ContentModelBlockType.Paragraph> {
    format: ContentModelParagraphFormat;
    segments: ContentModelSegment[];
    isDummy: boolean;
}

export interface ContentModelBlockGroupBase<T extends ContentModelBlockGroupType>
    extends ContentModelBlockBase<ContentModelBlockType.BlockGroup> {
    blockGroupType: T;
    blocks: ContentModelBlock[];
}

export interface ContentModelDocument
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.Document> {
    document: Document;
}

export interface ContentModelQuote
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.Quote> {}

export interface ContentModelCode
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.Code> {}

export interface ContentModelHeader
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.Header> {
    headerLevel: number;
}

export interface ContentModelListItem
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.ListItem> {
    listTypes: ('ordered' | 'unordered')[];
}

export interface ContentModelTableCell
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.TableCell> {
    spanLeft: boolean;
    spanAbove: boolean;
    isHeader?: boolean;
}

export interface ContentModelEntityBlock
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.Entity> {}

export interface ContentModelGeneralBlock
    extends ContentModelBlockGroupBase<ContentModelBlockGroupType.General> {
    node: Node;
}

export type ContentModelBlockGroup =
    | ContentModelDocument
    | ContentModelQuote
    | ContentModelCode
    | ContentModelHeader
    | ContentModelListItem
    | ContentModelTableCell
    | ContentModelEntityBlock
    | ContentModelGeneralBlock;

export type ContentModelBlock =
    | ContentModelBlockGroup
    | ContentModelList
    | ContentModelTable
    | ContentModelParagraph;

export interface ContentModelSegmentBase<T extends ContentModelSegmentType> {
    segmentType: T;
    format: ContentModelSegmentFormat;
    isSelected?: boolean;
}

export interface ContentModelSelectionMarker
    extends ContentModelSegmentBase<ContentModelSegmentType.SelectionMarker> {
    isSelected: true;
}

export interface ContentModelText extends ContentModelSegmentBase<ContentModelSegmentType.Text> {
    text: string;
}

export interface ContentModelImage extends ContentModelSegmentBase<ContentModelSegmentType.Image> {
    src: string;
    alterText?: string;
}

export interface ContentModelBr extends ContentModelSegmentBase<ContentModelSegmentType.Br> {}

export interface ContentModelEntitySegment
    extends ContentModelSegmentBase<ContentModelSegmentType.Entity> {}

export interface ContentModelGeneralSegment
    extends ContentModelSegmentBase<ContentModelSegmentType.General>,
        ContentModelGeneralBlock {}

export type ContentModelSegment =
    | ContentModelSelectionMarker
    | ContentModelText
    | ContentModelImage
    | ContentModelEntitySegment
    | ContentModelBr
    | ContentModelGeneralSegment;
