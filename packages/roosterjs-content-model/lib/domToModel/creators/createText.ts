import { ContentModel_SegmentType } from '../../types/SegmentType';
import { ContentModel_Text } from '../../types/ContentModel';
import { FormatContext } from '../../types/internal/FormatContext';

export function createText(context: FormatContext, text: string): ContentModel_Text {
    const result: ContentModel_Text = {
        segmentType: ContentModel_SegmentType.Text,
        text: text,
        format: context.segmentFormat,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
