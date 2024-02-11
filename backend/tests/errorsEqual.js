const http = require('node:http');
const { AsyncLocalStorage } = require('node:async_hooks');
const emiter = require('event')

const asyncLocalStorage = new AsyncLocalStorage();

const store = { id: 1 };

emitter.on('my-event', () => {
  asyncLocalStorage.enterWith(store);
});
emitter.on('my-event', () => {
  asyncLocalStorage.getStore(); // Returns the same object
});

asyncLocalStorage.getStore(); // Returns undefined
emitter.emit('my-event');
asyncLocalStorage.getStore(); // Returns the same object 