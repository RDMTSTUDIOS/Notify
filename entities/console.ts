// Types
import { NConsoleInterface, NCell, NLog, NInfo } from "../types/console";

// Assets
import trash from "../default/trash.svg";
import minimize from "../default/window-minimize.svg";

// Entity
export default class NConsole {

    // ----------------------------------------------------------------------------

    // Entity props
    private id: string;             // Entity identifier
    private historySize: number;    // Maximum amount of cells displayed in content view at once

    // View props
    private view!: HTMLElement;          // Parent element
    private viewContent!: HTMLElement;   // View component: Displaying messages

    private history: [NCell?] = [];     // |-> ViewContent history: nodes in viewContent and messages
    
    // Interface props
    private interfaceID: string;            // Selected interface identifier
    private interface: NConsoleInterface;  // |-> Interface object link

    // Services props
    private logger: boolean;        // Write logs | Don't write logs
    private backLog: [NLog?] = [];  // |-> Logs storage

    // State props
    private collapsed: boolean = false; // Content view is hidden or not

    // ----------------------------------------------------------------------------

    constructor(props: {
        id: string,
        historySize: number,
        interfaceId: string,
        interface: NConsoleInterface,
        logger?: boolean }) {

        this.id = props.id;
        this.historySize = props.historySize;

        this.interfaceID = props.interfaceId
        this.interface = props.interface;

        props.logger ? this.logger = true : this.logger = false;

        NConsole.INITVIEW(this.interface, this);
    };

    // ----------------------------------------------------------------------------

    // Initiate Console component
    private static INITVIEW(consoleInterface: NConsoleInterface, entity: NConsole): void {
        
        const view: HTMLElement = document.createElement('div');
        view.className = consoleInterface.view;

        {   // title --->
            const title: HTMLElement = document.createElement('div');
            title.className = consoleInterface.title;

            title.innerHTML = `${entity.id}`;
            view.appendChild(title);

            title.onmousedown = (e): void => {
            
                const dY: number = view.offsetTop - e.clientY;
                const dX: number = view.offsetLeft - e.clientX;

                document.addEventListener('mousemove', function MOVE(e) {
                    title.addEventListener('mouseup', function rm() {
                        title.removeEventListener('mouseup', rm);
                        document.removeEventListener('mousemove', MOVE);
                    });

                    view.style.top = `${e.clientY + dY}px`;
                    view.style.left = `${e.clientX + dX}px`;
                });
            };

            view.appendChild(title);
        };  // title <---

        {   // buttonsContainer --->
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = consoleInterface.buttonsContainer.container;

            {   // Nimimize --->
                const cache_collapseButtom: HTMLElement = document.createElement('div');
                cache_collapseButtom.className = consoleInterface.buttonsContainer.button;

                const temp: HTMLElement = document.createElement('img');
                temp.setAttribute('src', minimize);

                cache_collapseButtom.appendChild(temp)
                cache_collapseButtom.onclick = () => {
                    
                    if (entity.collapsed) {
                        entity.collapsed = false;
                        entity.expand();
                        return;
                    };

                    entity.collapsed = true;
                    entity.collapse();
                    return;
                };

                buttonsContainer.appendChild(cache_collapseButtom);
            };  // Nimimize <---

            {   // Clear --->
                const cache_clear: HTMLElement = document.createElement('div');
                cache_clear.className = consoleInterface.buttonsContainer.button;

                const temp: HTMLElement = document.createElement('img');
                temp.setAttribute('src', trash);

                cache_clear.appendChild(temp)
                cache_clear.onclick = () => {
                    entity.clear();
                };

                buttonsContainer.appendChild(cache_clear);
            };  // Clear <---

            view.prepend(buttonsContainer);
        };  // buttonsContainer <---

        {   // viewContent --->
            const viewContent: HTMLElement = document.createElement('div');
            viewContent.className = consoleInterface.viewContent;

            entity.viewContent = viewContent;
            view.appendChild(viewContent);

        };  // viewContent <---

        entity.view = view;
    };

    // ----------------------------------------------------------------------------

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
        cache.className = this.interface.message;
        
        cache.innerHTML = `Message: ${content}`;
        cache.onclick = (): void => {
            navigator.clipboard.writeText(content);
        }

        return cache;
    };

    // ----------------------------------------------------------------------------

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
            interfaceID: this.interfaceID,
            historySize: this.historySize,
            logger: this.logger,
        };

        return responce;
    };

    // ----------------------------------------------------------------------------
    
};