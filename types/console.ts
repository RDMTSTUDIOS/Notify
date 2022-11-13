
type ClassName = string;

export interface NConsoleInterface {
    view: ClassName;
    title: ClassName;
    buttonsContainer: {
        container: ClassName,
        button: ClassName,
    };
    viewContent: ClassName;
    message: ClassName;
}

export type NCell = {
    element: HTMLElement;
    content: string;
}

export type NLog = {
    date: string;
    message: string;
}

export interface NInfo {
    readonly id: string;
    readonly interfaceID: string;
    readonly historySize: number;
    readonly logger: boolean;
}