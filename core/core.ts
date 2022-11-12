import { NCell, NCodeMap, NConsole_Interface, NInfo, NInterfaces, NInterface_Component, NLog } from "./types";
import "../default/terminal.css";
import trash from "../default/trash.svg";
import minimize from "../default/window-minimize.svg";

export default class Notify {

    // API ->
    // Initiate new console. Returns object: NConcole
    public static initConsole(props: {id: string, historySize: number, interfaceId?: string, logger?: boolean}) {
        
        // Initiate variable to with a link to interface
        let interfaceLink: NConsole_Interface;

        // If interface is not provided, default state in 'terminal'.
        // If this interface id is not registered - throw an error.
        if (!props.interfaceId) {
            props.interfaceId = 'terminal';
            interfaceLink = Notify.interfaces['terminal'];
        } else if (!Notify.interfaces[props.interfaceId]) {
            throw new NotifyError(4, `No such interface "${props.interfaceId}"`)
        };
        
        // If interface id is ok create a link to an interface by the link id.
        interfaceLink = Notify.interfaces[props.interfaceId];

        // Return object: NConsole with the constructor props, link to an interface construcor, interface id.
        return new NConsole(props, interfaceLink)
    };

    // public static registerInterface(id: string, props: {
    //     view: {
    //         className?: string,
    //         style?: string,
    //     }, 
    //     cell: {
    //         className?: string,
    //         style?: string,
    //     }}) {

    //     if ( !(props.view && props.cell) ) { throw new NotifyError(2) };
    //     if ( !(props.view.className || props.view.style) || !(props.cell.className || props.cell.style) ) { throw new NotifyError(1) }

    //     if (Notify.interfaces[id]) { throw new NotifyError(3, `Interface id "${id}" is already taken. Choose another id.`)};
         
    //     Notify.interfaces[id] = props;
    //     return id;
    // };
    // <

    private static interfaces: NInterfaces = {

        terminal: {

            view: {
                className: 'Notify-Terminal-View',
                style: 'position: asbolute;',
            },
            cell: {
                className: 'Notify-Terminal-Cell',
                style: '',
            },
        },
    };
    
};


class NotifyError extends Error {

    private static codesMap: NCodeMap = {
        1: 'AT LEAST ONE PARAMETER MUST BE PROVIDED',
        2: 'NOT ALL NECESSARY PARAMETERS PROVIDED',
        3: 'NAME ALREDY TAKEN',
        4: 'WRONG PARAMETER',
    };

    constructor(code: number, message?: string) {
        super(`\n\n${message}\n`);
        this.name = `Notify. Error code ${code}: ${NotifyError.codesMap[code]}`;
    };
};


class NConsole {

    private id: string;
    private interface: NConsole_Interface;
    // private interfaceID: string;
    private historySize: number;

    private history: [NCell?] = [];
    private logger: boolean;
    private backLog: [NLog?] = [];

    // Parent Console component.
    private view: HTMLElement;
    // Parent component for displaying messages.
    private viewContent: HTMLElement;
    // Cell interface for constructor.
    // private cell: NInterface_Component;
    private collapsed: boolean = false;

    constructor(props: {id: string, historySize: number, interfaceId?: string, logger?: boolean}, interfaceLink: NConsole_Interface) {

        // Component name.
        this.id = props.id;
        // Component maximum content displayed in one console.
        this.historySize = props.historySize;
        // Interface constructor ID.
        // this.interfaceID = props.interfaceId;
        // Link to an interface constructor.
        this.interface = interfaceLink;

        // Switching logger.
        props.logger ? this.logger = true : this.logger = false;

        // Initiate view component.
        this.viewContent = NConsole._initViewContent_(this.interface.cell);
        this.view = NConsole._initView_(this.interface.view, this.id, this.viewContent, this);

        // {   // Parse cell interface constructor.
        //     const cache = this.interface.cell;
        //     this.cell = {
        //         className: cache.className,
        //         style: cache.style,
        //     };
        // }
    };

    // System Methods -> 
    private free(): string{

        const cache = this.history.shift();
        cache?.element.remove();

        return `History size exceeded, "${cache?.content}" removed.\n`;
    };

    private write(cell: NCell): string{

        let cache_deleted: string = '';

        if (this.history.length === this.historySize) { cache_deleted = this.free() };

        this.history.push(cell);
        this.viewContent.appendChild(cell.element);
        
        return `${cache_deleted}Message: "${cell.content}".`;
    };

    private writeLog(responce: string): void {

        const log: NLog = {
            date: new Date().toUTCString(),
            message: responce,
        };

        this.backLog.push(log);
    };

    private createCell(content: any): HTMLElement {
        
        const cache = document.createElement('div');
        cache.innerHTML = `Message:&nbsp&nbsp${content}`;
        cache.onclick = (): void => {
            navigator.clipboard.writeText(content);
        }

        return cache;
    };

    // Initiate a viewContent component on console creating stage.
    private static _initViewContent_(props: NInterface_Component): HTMLElement {

        const cache = document.createElement('div');
        cache.className = props.className ? props.className : '';
        cache.setAttribute('style', props.style ? props.style : '');

        return cache
    };

    // Initiate a view component on console creating stage.
    private static _initView_(props: NInterface_Component, id: string, viewContent: HTMLElement, Nconsole: NConsole): HTMLElement {
        
        // View Component ->
        const cache = document.createElement('div');
        cache.className = props.className ? props.className : '';
        cache.setAttribute('style', props.style ? props.style : '');
        // <-

        // : Title ->
        {
            const cache_local: HTMLElement = document.createElement('div');
            cache_local.innerHTML = `${id}`;
            cache_local.className = `Notify-Terminal-Title`;
            cache.appendChild(cache_local);

            cache_local.onmousedown = (e): void => {
            
                const dY: number = cache.offsetTop - e.clientY;
                const dX: number = cache.offsetLeft - e.clientX;

            document.addEventListener('mousemove', function MOVE(e) {
                cache_local.addEventListener('mouseup', function rm() {
                    cache_local.removeEventListener('mouseup', rm);
                    document.removeEventListener('mousemove', MOVE);
                });

                cache.style.top = `${e.clientY + dY}px`;
                cache.style.left = `${e.clientX + dX}px`;
            });

            };

            // : Collapse button ->
            {
                const cache_collapseButtom: HTMLElement = document.createElement('div');
                cache_collapseButtom.className = 'Notify-Terminal-Button Notify-conf-collapse';
                const temp: HTMLElement = document.createElement('img');
                temp.setAttribute('src', minimize);
                cache_collapseButtom.appendChild(temp)
                cache_collapseButtom.onclick = () => {
                    
                    if (Nconsole.collapsed) {
                        Nconsole.collapsed = false;
                        Nconsole.expand();
                        return;
                    };

                    Nconsole.collapsed = true;
                    Nconsole.collapse();
                    return;
                };
                cache.prepend(cache_collapseButtom);
            }
            // <-
            {
                const cache_clear: HTMLElement = document.createElement('div');
                cache_clear.className = 'Notify-Terminal-Button Notify-conf-clear';
                const temp: HTMLElement = document.createElement('img');
                temp.setAttribute('src', trash);
                cache_clear.appendChild(temp)
                cache_clear.onclick = () => {
                    Nconsole.clear();
                };
                cache.prepend(cache_clear);
            }
        }
        // <-

        

        // : Content ->
        {
            cache.appendChild(viewContent);
        }
        // <- 

        return cache;
    };
    // <-


    // API ->
    // Mount console to DOM.
    public display(mountPoint?: HTMLElement) {
        if (mountPoint && !document.body.contains(this.view)) {
            mountPoint.appendChild(this.view);

        } else if (!document.body.contains(this.view)) {
            document.body.appendChild(this.view)
        }
        
        return;
    };

    // Remove element from DOM.
    public hide() {
        if (document.body.contains(this.view)) { this.view.remove() }
        return;

    };

    // Collapse viewContent.
    public collapse() {
        this.viewContent.style.display = 'none';
    };

    // Expand viewContent.
    public expand() {
        this.viewContent.style.display = 'flex';
    };

    // Send message to console. Returns string, removed message and written message.
    public message(content: any): string {
        
        const cell: NCell = {
            element: this.createCell(content),
            content: String(content),
        };

        const responce: string = this.write(cell);
        this.viewContent.prepend(cell.element);
        if (this.logger) { this.writeLog(responce); };
        
        return responce
    };

    // Clear history and view content.
    public clear(onlyLast?: boolean): {removedElements: number, responce: string} {

        let responce: string = '';
        let removed: number = 0;

        if (this.history.length === 0) {
            responce = 'System: clear called, but history is empty.';

        } else if (onlyLast) {
            const cache = this.history.shift();
            cache?.element.remove();
            responce = `System: last element removed "${cache?.content}".`;
            removed = 1;

        } else {
            responce = 'System: history cleared. Removed messages (message index: "message content") - ';
            const temp = this.history.length;
            const responceCache: [string?] = []

            for (let i: number = 0; i < temp; i++) {
                const cache = this.history.shift();
                cache?.element.remove();
                removed++;
                responceCache.push(`${i}: "${cache?.content}"`);
            };
            responce = responce.concat('', responceCache.join('; '));

        };

        if (this.logger) { this.writeLog(responce) };
        return {
            removedElements: removed,
            responce: responce,
        };
    };

    // Return Logs: string.
    public logs(header?: boolean): string {
        const responce: string = header ? `Console ID: ${this.id}\nHistory size: ${this.historySize}\n\nLogs [${this.backLog.length}]:\n\n` : '';
        return responce.concat('', !this.backLog.length ? 'Logs are empty' : this.backLog.map((e, i) => `${i}: ${e?.date}\n${e?.message}`).join('\n\n'));
    };

    // Return object with this.console props.
    public get info(): NInfo {

        const responce: NInfo = {   
            id: this.id,
            interface: this.interface,
            historySize: this.historySize,
            logger: this.logger,
        };

        return responce;
    };
    // <-
    
};