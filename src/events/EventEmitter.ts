import { EventEmitter } from 'node:events';

//created single sharde event bus instance
const myEmitter = new EventEmitter();
//this avoids memory leaks
myEmitter.setMaxListeners(20)

export default myEmitter;