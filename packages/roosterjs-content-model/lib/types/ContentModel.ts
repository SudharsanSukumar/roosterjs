import { ContentModel_BlockGroupType } from './BlockGroupType';
import { ContentModel_BlockType } from './BlockType';
import { ContentModel_ParagraphFormat } from './ParagraphFormat';
import { ContentModel_SegmentFormat } from './SegmentFormat';
import { ContentModel_SegmentType } from './SegmentType';

export interface ContentModel_BlockBase<T extends ContentModel_BlockType> {
    blockType: T;
}

// export interface ContentModel_List extends ContentModel_BlockBase<ContentModel_BlockType.List> {
//     listItems: ContentModel_ListItem[];
// }

// export interface ContentModel_Table extends ContentModel_BlockBase<ContentModel_BlockType.Table> {
//     cells: ContentModel_TableCell[][];
// }

export interface ContentModel_Paragraph
    extends ContentModel_BlockBase<ContentModel_BlockType.Paragraph> {
    format: ContentModel_ParagraphFormat;
    segments: ContentModel_Segment[];
    isDummy: boolean;
}

export interface ContentModel_BlockGroupBase<T extends ContentModel_BlockGroupType>
    extends ContentModel_BlockBase<ContentModel_BlockType.BlockGroup> {
    blockGroupType: T;
    blocks: ContentModel_Block[];
}

export interface ContentModel_Document
    extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.Document> {
    document: Document;
}

// export interface ContentModel_Quote
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.Quote> {}

// export interface ContentModel_Code
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.Code> {}

// export interface ContentModel_Header
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.Header> {
//     headerLevel: number;
// }

// export interface ContentModel_ListItem
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.ListItem> {
//     listTypes: ('ordered' | 'unordered')[];
// }

// export interface ContentModel_TableCell
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.TableCell> {
//     spanLeft: boolean;
//     spanAbove: boolean;
//     isHeader?: boolean;
// }

// export interface ContentModel_Entity
//     extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.Entity> {}

export interface ContentModel_GeneralBlock
    extends ContentModel_BlockGroupBase<ContentModel_BlockGroupType.General> {
    node: Node;
}

export type ContentModel_BlockGroup =
    | ContentModel_Document
    // | ContentModel_Quote
    // | ContentModel_Code
    // | ContentModel_Header
    // | ContentModel_ListItem
    // | ContentModel_TableCell
    // | ContentModel_Entity
    | ContentModel_GeneralBlock;

export type ContentModel_Block =
    | ContentModel_BlockGroup
    // | ContentModel_List
    // | ContentModel_Table
    | ContentModel_Paragraph;

export interface ContentModel_SegmentBase<T extends ContentModel_SegmentType> {
    segmentType: T;
    format: ContentModel_SegmentFormat;
    isSelected?: boolean;
}

export interface ContentModel_SelectionMarker
    extends ContentModel_SegmentBase<ContentModel_SegmentType.SelectionMarker> {
    isSelected: true;
}

export interface ContentModel_Text extends ContentModel_SegmentBase<ContentModel_SegmentType.Text> {
    text: string;
}

// export interface ContentModel_Image
//     extends ContentModel_SegmentBase<ContentModel_SegmentType.Image> {
//     src: string;
//     alterText?: string;
// }

// export interface ContentModel_Br extends ContentModel_SegmentBase<ContentModel_SegmentType.Br> {}

// export interface ContentModel_Entity
//     extends ContentModel_SegmentBase<ContentModel_SegmentType.Entity> {}

export interface ContentModel_GeneralSegment
    extends ContentModel_SegmentBase<ContentModel_SegmentType.General>,
        ContentModel_GeneralBlock {}

export type ContentModel_Segment =
    | ContentModel_SelectionMarker
    | ContentModel_Text
    // | ContentModel_Image
    // | ContentModel_Entity
    // | ContentModel_Br
    | ContentModel_GeneralSegment;
