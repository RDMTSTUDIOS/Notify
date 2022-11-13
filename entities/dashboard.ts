

// ! IN DEVELOPMENT !

import { NDashboardInterface } from "../types/dashboard";

import not_hidden from "../default/eye.svg";
import hidden from "../default/eye-splash.svg";
import terminal from "../default/terminal.svg";
import minimize from "../default/window-minimize.svg";
import NConsole from "./console";


export default class NDashboard {

    // ----------------------------------------------------------------------------

    private static instance: NDashboard;   // Singleton Instance

    private view!: HTMLElement;            // Parent element
    private viewContent!: HTMLElement;     // View component: Displaying messages

    // State props
    private collapsed: boolean = false;    // Content view is hidden or not
    private storage: [NConsole?] = [];

    // ----------------------------------------------------------------------------

    constructor(props: NDashboardInterface, storage: []) {
        if (NDashboard.instance) {
            return NDashboard.instance;
        };

        NDashboard.initView(props, this);
        NDashboard.instance = this;
        
        document.body.appendChild(this.view);
    };

    // ----------------------------------------------------------------------------

    private static initView(NDashboardInterface: NDashboardInterface, entity: NDashboard) {

        const view: HTMLElement = document.createElement('div');
        view.className = NDashboardInterface.view;

        {   // title --->
            const title: HTMLElement = document.createElement('div');
            title.className = NDashboardInterface.title;

            title.innerHTML = 'Dashboard';
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
            buttonsContainer.className = NDashboardInterface.buttonsContainer.container;

            {   // Nimimize --->
                const cache_collapseButtom: HTMLElement = document.createElement('div');
                cache_collapseButtom.className = NDashboardInterface.buttonsContainer.button;

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

            view.prepend(buttonsContainer);
        };  // buttonsContainer <---

        {   // viewContent --->
            const viewContent: HTMLElement = document.createElement('div');
            viewContent.className = NDashboardInterface.viewContent;

            entity.viewContent = viewContent;
            view.appendChild(viewContent);

        };  // viewContent <---

        entity.view = view;
    };

    // ----------------------------------------------------------------------------

    // Collapse viewContent.
    public collapse() {
        this.viewContent.style.display = 'none';
    };

    // Expand viewContent.
    public expand() {
        this.viewContent.style.display = 'flex';
    };
};