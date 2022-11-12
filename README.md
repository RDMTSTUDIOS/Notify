# Notify

Custom visual console for web development.

## Usage

Import Notiy and initiate first custom console.

```js
import Notify from "..." //Entry point is notify/index.ts

const MyConsole = Notify.initConsole({
    // Displayed name. More for semantic.
    id: 'Debug',
    // Maximum logs, displayed in one time.
    historySize: 10,
    // If true - will write logs you can later export.
    // default - false.
    logger: true, 
});
```
