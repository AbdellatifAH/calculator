const display = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");
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
    pointButton.addEventListener("click", pointButtonF, { once: true })
}

function numberButtonsF(e) {
    operandContainer = operandContainer + e.target.innerText;
    dScreen(operandContainer)
}

function operatorButtonsF(e) {
    if (operator) {
        secondOperand = Number(operandContainer);
        operandContainer = '';
        operator2 = e.target.innerText;
        clrD = true
        firstOperand = operate(firstOperand, operator, secondOperand);
        operator = operator2;
        dScreen(firstOperand)
    }
    else {
        firstOperand = Number(operandContainer);
        operandContainer = '';
        operator = e.target.innerText;
        clrD = true;
    }
    pointButton.addEventListener("click", pointButtonF, { once: true })
}

function equalButtonF() {
    if (firstOperand != 0 && operator != 0) {
        equalButton.removeEventListener("click", equalButtonF)
        pointButton.removeEventListener("click", pointButtonF)
        numberButtons.forEach(number => {
            number.removeEventListener("click", numberButtonsF);
        });
        operatorButtons.forEach(operatorSign => {
            operatorSign.removeEventListener("click", operatorButtonsF);
        });
        secondOperand = Number(operandContainer);
        operandContainer = '';
        result = operate(firstOperand, operator, secondOperand);
        if(result)
        dScreen(Number(result.toFixed(7)))

    }
    else {
        dScreen("Try again");
        delay(1000).then(() => clear());
    }
}

function pointButtonF(e) {
    operandContainer = operandContainer + e.target.innerText;
    dScreen(operandContainer);
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

clearButton.addEventListener("click", () => {
    clear();
})

pointButton.addEventListener("click", pointButtonF, { once: true })