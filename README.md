# Notify

Custom visual console for web development.

## Usage

Import Notiy and initiate first custom console.

```js
import Notify from "..." //Entry point is notify/index.ts

const MyConsole = Notify.initConsole({
    id: 'Debug',
    historySize: 10,
    logger: true, 
});

MyConsole.display();

// id: string - Displayed name. More for semantic.
// historySize: number - Maximum logs, displayed in one time.
// logger: boolean - If true - will write logs you can later export. Default - false.

// .display() mounts element to DOM (Just makes it visible, logs and messages are still working even it don't mounted). it can take a parameter - custom mount point. By default it's document.body.
```
![Снимок экрана 2022-11-12 в 16 46 25](https://user-images.githubusercontent.com/118057254/201477439-fb154a49-2f29-41f6-a350-d67b79ef2f92.png)
