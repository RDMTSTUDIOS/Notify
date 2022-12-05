# Notify

Custom simple draggable visual console for web development.

## Usage

Import Notify and initiate first custom console.

```js
import Notify from "..." // Entry point is notify/index.ts

const MyConsole = Notify.initConsole({
    id: 'Debug',
    historySize: 10,
    logger: true, 
});

MyConsole.display();

// id: string - Displayed name. More for semantic.
// historySize: number - Maximum logs, displayed in one time.
// logger?: boolean - If true - will write logs you can later export. Default - false.
// interfaceId? --- currently unavailable ---. For changing console view interface. Default - 'terminal'.

// .display() mounts element to DOM (Just makes it visible, logs and messages are still working even it don't mounted). it can take a parameter - custom mount point. By default it's document.body.
```
Your first console will appear on the page. You can create any amount of consoles.

![Снимок экрана 2022-11-13 в 22 24 10](https://user-images.githubusercontent.com/118057254/201540254-d6b8b349-f973-4e30-887e-18c36318616a.png)

Consoles are fully draggble, you can put them in any place on the page by dragging them by the title part of the console.

![Снимок экрана 2022-11-13 в 22 20 50](https://user-images.githubusercontent.com/118057254/201540268-457e98e2-fe89-44ea-ae8c-893aa525d331.png)

## Interface

There are two buttons - minimize view and clear history.

**Minimize view** will hide history but not clear it. History is still will receive messages and write logs.

![Снимок экрана 2022-11-13 в 22 07 56](https://user-images.githubusercontent.com/118057254/201539587-ddc1d7b0-f1d6-4743-8c60-d009dccd7a60.png)

**Clear history** deletes all elements from the history.

By clicking on the any message cell content will be copied to clipboard.

![Снимок экрана 2022-11-13 в 22 22 22](https://user-images.githubusercontent.com/118057254/201540295-3158eea1-b076-44b1-b78a-a842bde5a5ba.png)

## Try it / Test

Notify also includes file with visual test.

To use it just import `NotifyCoreTest` from `"notify/test"` and call function `NotifyCoreTest()`.

```js
import NotifyCoreTest from "./notify/test";
NotifyCoreTest();
```

It will insert a light preview to the DOM.

![Снимок экрана 2022-11-13 в 22 06 06](https://user-images.githubusercontent.com/118057254/201539994-01442c8f-9492-4108-b780-93f22554f334.png)

## API

#### Return console
```js
const customConsole = Notify.initConsole()
```
#### Mount interface to document
```js
customConsole.display(mountPoint?: any)
```
#### Send message
Similar to console.log(), but logs a string.
Return responce: string - what was send and deleted.
```js
customConsole.message(content: any)
```
![Снимок экрана 2022-11-13 в 22 05 30](https://user-images.githubusercontent.com/118057254/201539732-8da9da62-0bbc-4a3a-a572-f0dac2857e13.png)

> Highlighted line - last message

#### Minimize / Expand
Just a minimize button functionality, but programmatically.
```js
MyConsole.collapse()
MyConsole.expand()
```
#### Clear history and view from messages displayed in the console
If onlyLast = true - will delete only last element.

Returns object { removedElements: number, responce: string }
```js
const cache = MyConsole.clear(onlyLast? boolean)

cache.removedElements
cache.responce
```
#### See console details
```js
const cache = MyConsole.info

cache.historySize: number
cache.id: string
cache.interface: ---
cache.logger: boolean
```
#### Return console logs
If header = true - some additional details will appear in the top of responce. Default false.
```js
const cache = MyConsole.logs(header: boolean)
console.log(cache);
```
![Снимок экрана 2022-11-12 в 17 43 27](https://user-images.githubusercontent.com/118057254/201479490-47ed3bbd-80f5-4e81-8238-4d0bd6e0e294.png)

#### Hide console (not just minimize)
```js
MyConsole.hide()
```
