let firstNumber = "";
let secondNumber = "";
const operators = ["+","-","*","/"];
//Keep count if the last input was an operator
let opCount = false;
let lastOp;

function numberFormatting(num) {
    let formattedAns = num.toFixed(10);
    // Remove trailing zeros after decimal point and handle integer part separately 
    //(this part was revealed to me in a dream *cough*ChatGPT*cough*)
    let finalAns = formattedAns.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");;
    
    if (finalAns.length>12) {
        if (num<10) {
            console.log("trailing");
            return finalAns.slice(0,12);;
        } else {
            return "Num too big"
        }        
    }
    return finalAns;
}

function add (a,b) {
    let ans = parseFloat(a)+parseFloat(b);
    return numberFormatting(ans);
}

function subtract (a,b) {
    let ans = parseFloat(a)-parseFloat(b);
    return numberFormatting(ans);
}

function multiply (a,b) {
    let ans = parseFloat(a)*parseFloat(b);
    return numberFormatting(ans);
}

function divide (a,b) {
    if (b === "0") {
        return "Arghhhhhhhhh";
    }
    let ans = parseFloat(a)/parseFloat(b);
    return numberFormatting(ans)
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
    else if (op==='*'||op==='+/-') {
        return multiply(first,second);
    } 
    else if (op==='/'||op==="%") {
        return divide(first,second);
    } 
}

const buttons = document.querySelectorAll(".button");
let display = document.querySelector('#display');

buttons.forEach((button) =>{
    let btn = button.textContent;
    button.addEventListener('mousedown', () => {
        button.style.opacity = '0.5';
        
        if (btn === "+/-") {
            display.textContent=display.textContent*-1;
        }
        //Checks everything related to the operators
        else if (operators.some((operator) => btn.includes(operator))) {
            firstNumber = display.textContent;
            lastOp = btn;            
            if (opCount){
                secondNumber = display.textContent;
                display.textContent = operate(firstNumber, btn, secondNumber);
            } else {
                opCount = true;
            }
        }
        else if (btn === "=") {       
            secondNumber=display.textContent;
            display.textContent = operate(firstNumber, lastOp, secondNumber);
            lastOp = btn;
        }
        else if (btn ==="AC") {
            display.textContent = "";
            firstNumber = "";
            secondNumber = "";
            lastOp = "";
        }
        else if (btn === "." && opCount === false) {
            screen = display.textContent;
            if (!screen.includes('.')) {
                display.textContent+=".";  
            }        
        }
        else if (btn === "%") {
            firstNumber = display.textContent;
            secondNumber = "100";
            display.textContent=operate(firstNumber, btn, secondNumber);
        }
        else if (btn === "+/-") {
            firstNumber = display.textContent;
            secondNumber = "-1";
            display.textContent=operate(firstNumber, btn, secondNumber);
        }
        else if (btn === "Del") {
            display.textContent=display.textContent.slice(0,-1);
        }
        else if (display.textContent === "0") {
            display.textContent=btn;
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
                if (display.textContent.length===12) {
                    console.log("Number limit reached")
                }
                else {
                    display.textContent+=btn;
                }
            }
        }
        
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
console.log(opCount);
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        if (display.textContent === "0") {
            display.textContent=event.key;
        }
        else if (opCount) {
            display.textContent = "";
            display.textContent+=event.key;
            opCount = false;
        }
        else if (lastOp==="=") {
            firstNumber = display.textContent;
            secondNumber = "";
            display.textContent="";
            display.textContent+=event.key;
            lastOp="";
        } else {
            if (display.textContent.length===12) {
                console.log("Number limit reached")
            }
            else {
                display.textContent+=event.key;
            }
        }
    }

    // Handle backspace
    if (event.key === 'Backspace') {
        event.preventDefault(); // Prevent the default backspace action
        display.textContent = display.textContent.slice(0, -1);
    }

    // Handle enter
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default backspace action
        secondNumber=display.textContent;
        display.textContent = operate(firstNumber, lastOp, secondNumber);
        lastOp = "=";
    }


});



