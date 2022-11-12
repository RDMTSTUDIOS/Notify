# Notify

Custom visual console for web development.

## Usage

Import Notiy and initiate first custom console.

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

Consoles are fully draggble, you can put them in any place on the page by dragging them by the title part of the console.

Highlighted line - last message.

![Снимок экрана 2022-11-12 в 16 46 25](https://user-images.githubusercontent.com/118057254/201477439-fb154a49-2f29-41f6-a350-d67b79ef2f92.png)

## API

Return console
```js
const customConsole = Notify.initConsole()
```
Mount interface to document
```js
customConsole.display(mountPoint?: any)
```
Send message. Similar to console.log(), but logs a string.
Return responce: string - what was send and deleted.
```js
customConsole.message(content: any)
```
![Снимок экрана 2022-11-12 в 16 46 59](https://user-images.githubusercontent.com/118057254/201478896-a8f0caac-e673-4509-b6d4-cfb2daf20aec.png)

Minimize / Expand. Just a minimize button functionality, but programmatically.
```js
MyConsole.collapse()
MyConsole.expand()
```
Clear history and view from messages displayed in the console. If onlyLast = true - will delete only last element.

Returns object { removedElements: number, responce: string }
```js
const cache = MyConsole.clear(onlyLast? boolean)

cache.removedElements
cache.responce
```
See console details
```js
const cache = MyConsole.info

cache.historySize: number
cache.id: string
cache.interface: ---
cache.logger: boolean
```
Return console logs. if header = true - some additional details will appear in the top of responce. Default false.
```js
const cache = MyConsole.logs(header: boolean)
console.log(cache);
```
![Снимок экрана 2022-11-12 в 17 43 27](https://user-images.githubusercontent.com/118057254/201479490-47ed3bbd-80f5-4e81-8238-4d0bd6e0e294.png)

Hide console (not just minimize)
```js
MyConsole.hide()
```

## Interface

There are two buttons - minimize view and clear history.

**Minimize view** will hide history but not clear it. History is still will receive messages and write logs.

![Снимок экрана 2022-11-12 в 16 46 38](https://user-images.githubusercontent.com/118057254/201477848-5e4f4d8f-9f3a-4137-8a21-ef2264c268e6.png)

**Clear history** deletes all elements from the history.

By clicking on the any cell message content will be copied to clipboard.
