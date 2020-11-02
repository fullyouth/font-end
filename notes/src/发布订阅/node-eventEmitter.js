const EventEmitter = require('events')
const myEmitter = new EventEmitter()
myEmitter.once('event', () => {
  console.log('触发事件');
});
myEmitter.once('event', () => {
  console.log('触发事件');
});

myEmitter.emit('event');
myEmitter.emit('event');