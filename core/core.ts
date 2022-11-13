import NConsole from "../entities/console";
import NotifyError from "./exceptions";

// ! DEVELOPMENT !
// import NDashboard from "../entities/dashboard";

// Types
import { NInterfaces } from "../types/core";
import { NConsoleInterface } from "../types/console";

// Assets
import "../default/terminal.css";

export default class Notify {

    // API ->
    // Initiate new console. Returns object: NConcole
    public static initConsole(props: {id: string, historySize: number, interfaceId?: string, logger?: boolean}) {
        
        // Initiate variable to with a link to interface
        let interfaceLink: NConsoleInterface;

        // If interface is not provided, default state in 'terminal'.
        // If this interface id is not registered - throw an error.
        if (!props.interfaceId) {
            props.interfaceId = 'terminal';

        } else if (!Notify.interfaces[props.interfaceId]) {
            throw new NotifyError(4, `No such interface "${props.interfaceId}"`)
        };
        
        // If interface id is ok create a link to an interface by the link id.
        interfaceLink = Notify.interfaces[props.interfaceId];

        // Return entity: NConsole
        const cache: NConsole = new NConsole({
            id: props.id,
            historySize: props.historySize,
            interfaceId: props.interfaceId,
            interface: interfaceLink,
            logger: props.logger,
        });
        this.storage.push(cache);
        return cache;
    };

    // ! DEVELOPMENT !
    // public static initController() {
    //     return new NDashboard();
    // };

    private static interfaces: NInterfaces = {
        terminal: {
            view: 'Notify-Terminal-View',
            title: 'Notify-Terminal-Title',
            
            buttonsContainer: {
                container: 'Notify-Terminal-ButtonsContainer',
                button: 'Notify-Terminal-Button',
            },

            viewContent: 'Notify-Terminal-ViewContent',
            message: 'Notify-Terminal-Message',
        },
    };

    private static storage: [NConsole?] = [];
};