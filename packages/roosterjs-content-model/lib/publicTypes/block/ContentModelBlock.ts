import { ContentModelBlockGroup } from './group/ContentModelBlockGroup';
import { ContentModelEntityBlock } from './ContentModelEntityBlock';
import { ContentModelList } from './ContentModelList';
import { ContentModelParagraph } from './ContentModelParagraph';
import { ContentModelTable } from './ContentModelTable';

/**
 * A union type of Content Model Block
 */
export type ContentModelBlock =
    | ContentModelBlockGroup
    | ContentModelList
    | ContentModelTable
    | ContentModelParagraph
    | ContentModelEntityBlock;
