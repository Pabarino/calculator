let firstNumber;
let secondNumber;
let operator;

function add (a,b) {
    return a+b;
}

function subtract (a,b) {
    return a-b
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (first, op, second) {
    if (op==='+') {
        return add(first,second);
    } 
    else if (op==='-') {
        return subtract(first,second);
    } 
    else if (op==='*') {
        return multiply(first,second);
    } 
    else if (op==='/') {
        return divide(first,second);
    } 
}

