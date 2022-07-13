export type DefaultFormatParserType =
    | Partial<CSSStyleDeclaration>
    | ((e: HTMLElement) => Partial<CSSStyleDeclaration>);
