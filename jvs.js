const display = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const percentagButton = document.querySelector("#percentage");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const backSpaceButton = document.querySelector("#backSpace");
const pointButton = document.querySelector("#point");
const signButton = document.querySelector("#sign");
let operator = '',
    operator2 = '',
    firstOperand = 0,
    secondOperand = 0,
    result = 0,
    operandContainer = '',
    clrD = false;

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

    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        if (b == 0){
        dScreen("STOP IT!! OR...");
        delay(1000).then(() => clear());
        }
        else
            result = divide(a, b);
    } else {
        result = "ERROR";
    }

    return result;
}


function dScreen(x) {
    if (display.value == 0 || clrD)
        display.value = ''
    display.value = x;
    clrD = false;

}

function clear() {
    operator = '';
    operator2 = '';
    firstOperand = 0;
    secondOperand = 0;
    result = 0;
    operandContainer = '';
    clrD = false;
    dScreen('0')
    numberButtons.forEach(number => {
        number.addEventListener("click", numberButtonsF);
    });
    operatorButtons.forEach(operatorSign => {
        operatorSign.addEventListener("click", operatorButtonsF);
    });
    equalButton.addEventListener("click", equalButtonF)
    pointButton.addEventListener("click", pointButtonF)
    backSpaceButton.addEventListener("click", backSpaceButtonF);
    percentagButton.addEventListener("click", percentagButtonF);
    signButton.addEventListener("click", signButtonF);
}

function numberButtonsF(e) {
    operandContainer = operandContainer + e.target.value;
    dScreen(operandContainer)
}

function operatorButtonsF(e) {
    if (operator) {
        secondOperand = Number(operandContainer);
        operandContainer = '';
        operator2 = e.target.value;
        clrD = true
        firstOperand = operate(firstOperand, operator, secondOperand);
        operator = operator2;
        dScreen(firstOperand)
    }
    else {
        firstOperand = Number(operandContainer);
        operandContainer = '';
        operator = e.target.value;
        clrD = true;
    }
    pointButton.addEventListener("click", pointButtonF)
}

function equalButtonF() {
    if (firstOperand != 0 && operator != 0) {
        equalButton.removeEventListener("click", equalButtonF);
        backSpaceButton.removeEventListener("click", backSpaceButtonF);
        percentagButton.removeEventListener("click", percentagButtonF);
        signButton.removeEventListener("click", signButtonF);
        pointButton.removeEventListener("click", pointButtonF);
        numberButtons.forEach(number => {
            number.removeEventListener("click", numberButtonsF);
        });
        operatorButtons.forEach(operatorSign => {
            operatorSign.removeEventListener("click", operatorButtonsF);
        });
        secondOperand = Number(operandContainer);
        operandContainer = '';
        result = operate(firstOperand, operator, secondOperand);
        if(result && typeof(result)!=='string')
        dScreen(Number(result.toFixed(8)));
        else
        dScreen(result);

    }
    else {
        dScreen("Try again");
        delay(1000).then(() => clear());
    }
}

function backSpaceButtonF(){
    operandContainer= operandContainer.slice(0, -1);
    dScreen(operandContainer)
}

function percentagButtonF(){
    operandContainer= (firstOperand*operandContainer)/100;
    dScreen(operandContainer);
}

function signButtonF(){
    operandContainer=operandContainer*-1;
    dScreen(operandContainer);
}

function pointButtonF(e) {
    if(!operandContainer.includes(".")){
    operandContainer = operandContainer + e.target.value;
    dScreen(operandContainer);
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

numberButtons.forEach(number => {
    number.addEventListener("click", numberButtonsF);
});

operatorButtons.forEach(operatorSign => {
    operatorSign.addEventListener("click", operatorButtonsF);
});

equalButton.addEventListener("click", equalButtonF);

backSpaceButton.addEventListener("click", backSpaceButtonF);

clearButton.addEventListener("click", clear);

percentagButton.addEventListener("click", percentagButtonF);

signButton.addEventListener("click", signButtonF);

pointButton.addEventListener("click", pointButtonF);

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});