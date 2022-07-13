import { NodeType } from 'roosterjs-editor-types';

export interface NodeTypeMap {
    [NodeType.Attribute]: Attr;
    [NodeType.Comment]: Comment;
    [NodeType.DocumentFragment]: DocumentFragment;
    [NodeType.Document]: Document;
    [NodeType.DocumentType]: DocumentType;
    [NodeType.Element]: HTMLElement;
    [NodeType.ProcessingInstruction]: ProcessingInstruction;
    [NodeType.Text]: Text;
}

export function isNodeOfType<T extends NodeType>(
    node: Node | null,
    expectedType: T
): node is NodeTypeMap[T] {
    return !!node && node.nodeType == expectedType;
}
