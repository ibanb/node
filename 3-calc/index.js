const add = require('./add');
const divide = require('./divide');
const multiply = require('./multiply');
const subtract = require('./subtract')

const firstArg = process.argv[2];
const secondArg = process.argv[3];
const operator = process.argv[4];

switch( operator ) {
    case 'add': return add(firstArg, secondArg);
    case 'divide': return divide(firstArg, secondArg);
    case 'subtract': return subtract(firstArg, secondArg);
    case 'multiply': return multiply(firstArg, secondArg);
}