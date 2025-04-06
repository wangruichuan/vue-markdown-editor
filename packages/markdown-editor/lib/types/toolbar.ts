
// 基础工具栏类型
export enum BaseToolbarType {
    HEADING = "heading",
    HEADING_1 = "heading-1",
    HEADING_2 = "heading-2",
    HEADING_3 = "heading-3",
    HEADING_4 = "heading-4",
    HEADING_5 = "heading-5",
    HEADING_6 = "heading-6",
    BOLD = "bold",
    ITALIC = "italic",
    UNDERLINE = "underline",
    DELETE = "delete",
    LINE = "line",
    BLOCKQUOTE = "blockquote",
    UL = "ul",
    OL = "ol",
    INLINECODE = "inlinecode",
    CODE = "code",
    LINK = "link",
    IMAGE = "image",
    IMAGE_LINK = "image-link",
    IMAGE_UPLOAD = "image-upload",
    TABLE = "table",
    UNDO = "undo",
    REDO = "redo",
    FULLSCREEN = "fullscreen",
    WRITE = "write",
    PREVIEW = "preview",
    CONTENTS = "contents",
    HELP = "help",
    OUTPUT = "output",
    EMOJI = "emoji",
    SAVE = "save",
}
// 允许用户扩展的工具栏类型
export type ExtendedToolbarType = string;
// 合并基础类型和扩展类型
export type ToolbarType = BaseToolbarType | ExtendedToolbarType;

// 基础工具栏项接口
export interface BaseToolbarItem {
    type: ToolbarType;
    icon?: string;
    title?: string;
    description?: string;
    disabled?: boolean;
    onClick?: () => void;
}

// 工具栏列表项接口
export interface ToolbarItemListItem {
    title?: string;
    type: string;
    hotkey?: {
        command: string;
        description: string;
        handle?: () => void;
    };
    onClick?: (...args: any[]) => void | (() => void);

}

// 完整的工具栏项接口
export interface ToolbarItem extends BaseToolbarItem {
    list?: ToolbarItemListItem[];
    hotkey?: {
        command: string;
        description: string;
        handle?: () => void;
    };
    order?: number;
}

