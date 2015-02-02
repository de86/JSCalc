'use strict'

document.getElementById('buttons').addEventListener('click', somefunction, false);

var tickerScreen = document.getElementById('tickerScreen');
var calcScreen = document.getElementById('calcScreen');
var statusScreen = document.getElementById('status');
var firstNumber = "";
var currentNumber = "";
var operand = "";
var canClear = false;
var canReset = false;

function somefunction(e){
	var buttonClass = e.target.classList[1];

	if(buttonClass === 'number-button'){
		if(canReset) {
			reset();
			canReset = false;
		} else if(canClear){
			clearScreen(calcScreen);
			canClear = false;
		};
		var digit = e.target.innerHTML;
		currentNumber += digit;
		calcScreen.innerHTML += digit;
		return;
	};

	if(buttonClass === 'operator-button'){
		tickerScreen.innerHTML += calcScreen.innerHTML + ' ' + e.target.innerHTML + ' ';

		if(firstNumber === ""){
			firstNumber = parseInt(calcScreen.innerHTML);
			clearScreen(calcScreen);
			console.log(firstNumber);
		} else {
			var secondNumber = parseInt(calcScreen.innerHTML, 10);
			var result = calculate(firstNumber, secondNumber); 
			firstNumber = result;
			console.log(result);
			clearScreen(calcScreen);
			calcScreen.innerHTML = result;
			canClear = true;
		};
		operand = e.target.innerHTML;
		if(e.target.innerHTML === '='){
			canReset = true;
		}
		return;
	};
	
	if(buttonClass === 'clear-button'){
		reset();
		return;
	}
};

function calculate(x, y){

	switch (operand) {
		/*case '=':*/
		case '+':
			return sum(x, y);
			break;
		case '-':
			return subtract(x, y);
			break;
		case '*':
			return multiply(x, y)
			break;
		case '/':
			return divide(x, y);
			break;
		default:
	};
};

function sum(x, y){
	return x + y;
};

function subtract(x, y){
	return x - y;
};

function multiply(x, y){
	return x * y;
};

function divide(x, y){
	return x / y;
};

function clearScreen(toClear){
	toClear.innerHTML = "";
};

function reset(){
	clearScreen(calcScreen);
	clearScreen(tickerScreen);
	statusScreen.innerHTML = "";
	firstNumber = "";
	currentNumber = "";
	canClear = false;
}