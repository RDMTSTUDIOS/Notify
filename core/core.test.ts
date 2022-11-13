import Notify from "./core";

export default function NotifyCoreTest() {

    const MyConsole = Notify.initConsole({
    // Displayed name. More for semantic.
    id: 'Debug',
    // Maximum logs, displayed in one time.
    historySize: 10,
    // If true - will write logs you can later export.
    // default - false.
    logger: true, 
});

MyConsole.display();

const dev0 = document.createElement('button');
dev0.textContent = 'Display Console';
dev0.onclick = () => {
    MyConsole.display();
};

const dev = document.createElement('button');
dev.textContent = 'Send message';
dev.onclick = () => {
    MyConsole.message(i);
    i++;
};
let i: number = 1;

const dev1 = document.createElement('button');
dev1.textContent = 'Logs -> console.log()';
dev1.onclick = () => {
    console.log(MyConsole.logs(true));
};

const dev2 = document.createElement('button');
dev2.textContent = 'Clear 1 element';
dev2.onclick = () => {
    MyConsole.clear(true);
};

const dev3 = document.createElement('button');
dev3.textContent = 'Hide Console';
dev3.onclick = () => {
    MyConsole.hide();
};
document.body.appendChild(dev0);
document.body.appendChild(dev1);
document.body.appendChild(dev);
document.body.appendChild(dev2);
document.body.appendChild(dev3);


const MyConsole2 = Notify.initConsole({
    // Displayed name. More for semantic.
    id: 'Debug2',
    // Maximum logs, displayed in one time.
    historySize: 20,
    // If true - will write logs you can later export.
    // default - false.
    logger: true, 
});

MyConsole2.display()};