'use strict';
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');
let operand1, operand2, currentOperation, shouldDisplayUpdate = false;
const operations = ['plus', 'minus', 'multiply', 'divide'];

calculator.addEventListener('click', handleInput);
setDisplayContent(0);

function handleInput(event) {
    if (!event.target.hasAttribute('data-entity'))
        return;

    const button = event.target;
    const entity = button.getAttribute('data-entity');

    if (operations.includes(entity)) {
        currentOperation = entity;
        operand1 = +display.textContent;
        shouldDisplayUpdate = true;
    } else if (entity === 'equal') {
        operand2 = +display.textContent;
        display.textContent = getCalculationResult();
        operand1 = operand2;
    } else {
        onInputDigit(button.textContent);
    }
}

function onInputDigit(digit) {
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

function plusOperation() {

}

function minusOperation() {

}

function multiplyOperation() {

}

function divideOperation() {

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