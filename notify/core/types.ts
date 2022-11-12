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
    readonly interface: NConsole_Interface;
    readonly historySize: number;
    readonly logger: boolean;
}


// Console Interface ->
// All default and registered interfaces
export interface NInterfaces {
    [key: string]: NConsole_Interface;
};
// Specific interface 
export interface NConsole_Interface {
    view: NInterface_Component;
    cell: NInterface_Component;
};
// Interface component fields
export interface NInterface_Component {
    className?: string;
    style?: string;
};
// <- Console Interface


export interface NCodeMap {
    [key: number]: string;
}