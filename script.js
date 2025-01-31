// script.js

const screen = document.getElementById('screen');
const operationScreen = document.getElementById('operation');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    
    if (!target.matches('button')) return;

    const keyContent = target.textContent;
    const action = target.dataset.action;

    if (action === 'clear') {
        resetCalculator();
        return;
    }

    if (action === 'delete') {
        deleteLastInput();
        return;
    }

    if (!action) {
        appendNumber(keyContent);
        return;
    }

    if (action === 'operation') {
        handleOperator(keyContent);
        return;
    }

    if (action === 'calculate') {
        calculateResult();
        return;
    }
});

function resetCalculator() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitForSecondOperand = false;
    screen.value = '';
    operationScreen.value = '';
}

function deleteLastInput() {
    currentInput = currentInput.slice(0, -1);
    screen.value = currentInput;
}

function appendNumber(number) {
    if (waitForSecondOperand) {
        currentInput = number;
        waitForSecondOperand = false;
    } else {
        currentInput += number;
    }
    screen.value = currentInput;
    updateOperationScreen();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitForSecondOperand) {
        operator = nextOperator;
        updateOperationScreen();
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = String(result);
        screen.value = currentInput;
        firstOperand = result;
    }

    waitForSecondOperand = true;
    operator = nextOperator;
    updateOperationScreen();
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') return firstOperand + secondOperand;
    if (operator === '-') return firstOperand - secondOperand;
    if (operator === '*') return firstOperand * secondOperand;
    if (operator === '/') return firstOperand / secondOperand;
    if (operator === '%') return firstOperand % secondOperand;
    return secondOperand;
}

function calculateResult() {
    const inputValue = parseFloat(currentInput);
    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = String(result);
        screen.value = currentInput;
        operationScreen.value = '';
        firstOperand = result;
    }
    operator = null;
    waitForSecondOperand = false;
}

function updateOperationScreen() {
    operationScreen.value = `${firstOperand !== null ? firstOperand : ''} ${operator !== null ? operator : ''} ${currentInput}`;
}
