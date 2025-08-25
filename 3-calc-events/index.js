const add = require('./add');
const divide = require('./divide');
const multiply = require('./multiply');
const subtract = require('./subtract');

// создаём экземпляр
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const a = process.argv[2];
const b = process.argv[3];
const operator = process.argv[4];

myEmitter.on('add', (a, b) => {
    myEmitter.emit('result', add(a, b))
})

myEmitter.on('divide', (a, b) => {
    myEmitter.emit('result', divide(a, b))
})

myEmitter.on('subtract', (a, b) => {
    myEmitter.emit('result', subtract(a, b))
})

myEmitter.on('multiply', (a, b) => {
    myEmitter.emit('result', multiply(a, b))
})

myEmitter.on('result', (result) => {
    console.log(result)
})

myEmitter.emit(operator, a, b)






// switch( operator ) {
//     case 'add': return add(firstArg, secondArg);
//     case 'divide': return divide(firstArg, secondArg);
//     case 'subtract': return subtract(firstArg, secondArg);
//     case 'multiply': return multiply(firstArg, secondArg);
// }