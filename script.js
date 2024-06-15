let firstNumber;
let secondNumber;
const operators = ["+","-","*","/"];
//Keep count of if the last input was an operator
let opCount = false;
let lastOp;
let wasEqual = false;

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
    if (op === '='||op === "") {
        return second;
    }
    else if (op==='+') {
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

const buttons = document.querySelectorAll(".button");
let display = document.querySelector('#display');

buttons.forEach((button) =>{
    let btn = button.textContent;
    button.addEventListener('mousedown', () => {
        button.style.opacity = '0.5';
        
        //Checks everything related to the operators
        if (operators.some((operator) => btn.includes(operator))) {
            console.log(button.textContent);
            firstNumber = parseInt(display.textContent);
            lastOp = btn;            
            if (opCount){
                secondNumber = display.textContent;
                display.textContent = operate(firstNumber, btn, secondNumber);
            } else {
                opCount = true;
            }
        }
        else if (btn === "=") {            
            console.log(lastOp);
            secondNumber=display.textContent;
            display.textContent = operate(firstNumber, lastOp, secondNumber);
            lastOp = btn;
            console.log(operate(firstNumber, lastOp, secondNumber))
        }
        else if (btn ==="AC") {
            display.textContent = "";
            firstNumber = "";
            secondNumber = "";
            lastOp = "";
        }
        else if (display.textContent === "0") {
            display.textContent=btn;
        }
        else if (display.textContent.length===12) {
            console.log("Number limit reached")
        }
        else {            
            if (opCount) {
                display.textContent = "";
                display.textContent+=btn;
                opCount = false;
            }
            else if (lastOp==="=") {
                firstNumber = display.textContent;
                secondNumber = "";
                display.textContent="";
                display.textContent+=btn;
                lastOp="";
            } else {
                display.textContent+=btn;
            }
        }

        
        
        // operator = input.split('').filter((char) => char !== 'number').join('');
        // operate()

        // console.log(display.textContent);
        // console.log(button.textContent);
    });

    // Return to normal opacity on mouseup
    button.addEventListener('mouseup', () => {
        button.style.opacity = '1';
    });

    // Ensure opacity returns to normal if mouse leaves the button while pressed
    button.addEventListener('mouseleave', () => {
        button.style.opacity = '1';
    });
});



