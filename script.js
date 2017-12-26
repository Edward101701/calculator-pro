'use strict';
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');
const turnOnButton = document.querySelector('.j-on-button');
const turnOffButton = document.querySelector('.j-off-button');
let operand1, operand2, currentOperation, shouldDisplayUpdate = false;
const operations = ['plus', 'minus', 'multiply', 'divide', 'squareRoot'];
let isCalculatorActive = false;

turnOnButton.addEventListener('click', turnOnCalculator);
turnOffButton.addEventListener('click', turnOffCalculator);

function turnOnCalculator(event) {
    if (isCalculatorActive)
        return;

    event.stopPropagation();
    isCalculatorActive = true;
    calculator.addEventListener('click', handleInput);
    setDisplayContent(0);
}

function turnOffCalculator() {
    if (!isCalculatorActive)
        return;

    isCalculatorActive = false;
    calculator.removeEventListener('click', handleInput);
    clearDisplay();
    operand1 = null;
    operand2 = null;
    currentOperation = null;
    shouldDisplayUpdate = false;
}

function handleInput(event) {
    if (!event.target.hasAttribute('data-entity'))
        return;

    const button = event.target;
    const entity = button.getAttribute('data-entity');

    if (operations.includes(entity)) {
        handleMathOperation(entity);
    } else if (entity >= 0 || entity <= 9) {
        onInputDigit(entity);
    } else if (entity === 'equal') {
        handleEqualOperation();
    } else {
        //onInputDigit(button.textContent);
    }
}

function handleMathOperation(entity) {
    if (operand1) {
        handleEqualOperation();
    } else {
        operand1 = +display.textContent;
    }

    currentOperation = entity;
    shouldDisplayUpdate = true;
}

function onInputDigit(entity) {
    let digit = entity;

    if (display.textContent === '0' || shouldDisplayUpdate) {
        display.textContent = digit;
        shouldDisplayUpdate = false;
    } else {
        display.textContent += digit;
    }
}

function getDisplayContent() {
    return display.textContent;
}

function setDisplayContent(newResult) {
    display.textContent = newResult;
}

function clearDisplay() {
    display.textContent = '';
}

function handleEqualOperation() {
    operand2 = +display.textContent;
    let currentCalculationResult = getCalculationResult();
    display.textContent = currentCalculationResult;
    operand1 = currentCalculationResult;
    operand2 = null;
}

function sqrtOperation() {
    const value = +display.textContent;
    const sqrtValue = Math.sqrt(value);
    setDisplayContent(sqrtValue);
    operand1 = sqrtValue;
    operand2 = null;
    currentOperation = null;
}

function getCalculationResult() {
    if (currentOperation === 'plus') {
        return operand1 + operand2;
    } else if (currentOperation === 'minus') {
        return operand1 - operand2;
    } else if (currentOperation === 'multiply') {
        return operand1 * operand2;
    } else if (currentOperation === 'divide') {
        return operand1 / operand2;
    }
}