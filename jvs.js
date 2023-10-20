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
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    }
}

function display(a) {
    if (result.value == 0)
        result.value = ""
    result.value = result.value + a;
    displayValue = result.value;
}

const result = document.querySelector("#result")
const numberButtons = document.querySelectorAll(".numbers")
let displayValue = 0;
let operator, a, b;

numberButtons.forEach(number => {
    number.addEventListener("click", e => {
        display(e.target.innerText)
    });
});




