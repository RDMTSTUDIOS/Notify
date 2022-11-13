
type ClassName = string;

export interface NDashboardInterface {
    view: ClassName;
    title: ClassName;
    buttonsContainer: {
        container: ClassName,
        button: ClassName,
    };
    viewContent: ClassName;
    consoleRef: ClassName;
}