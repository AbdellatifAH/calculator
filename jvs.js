function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(a, operator, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        default:
            result = "ERROR"
    }
    return result;
}

function displayV(input) {
    if(clrD || display.value == 0)
    clearDisplay();
    display.value = display.value + input;
}

function clear(){
userInput=0;
a=0;
b=0;
operator="";
display.value=0;
}

function clearDisplay(){
    userInput=0;
    display.value="";
    clrD=false;
    }

const display = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
let  operator, a, b, result=0, userInput = 0;
let clrD=false;

numberButtons.forEach(number => {
    number.addEventListener("click", e => {
        displayV(e.target.innerText)
        userInput=userInput+e.target.innerText;
    });
});

operatorButtons.forEach(operatorr => {
    operatorr.addEventListener("click", e => {
        a=parseInt(userInput);
        operator=e.target.innerText;
        result=operate(a,operator,b);
        clrD=true;
    });
});

equalButton.addEventListener("click", () =>{
    b=parseInt(userInput);
    clearDisplay();
    result=operate(a,operator,b);
    displayV(result);
    a=result;
})

clearButton.addEventListener("click", () =>{
    clear();
})

