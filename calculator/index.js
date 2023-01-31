const calculatorDisplay = document.querySelector("h1");
const inputBtn = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// the object keeps the operation functions
const calculate = {
  // arrow functions that return result of operation
  "/": (firstNumber, secondNumber) =>
    secondNumber != 0 ? firstNumber / secondNumber : "error",
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue; // the first number
let operatorValue = ""; // keep the operand
let waitForNextValue = false; // status of number or operand

function setNumberValue(number) {
  if (waitForNextValue) {
    calculatorDisplay.innerText = number;
    waitForNextValue = false;
  } else {
    const displayValue = calculatorDisplay.innerText;
    calculatorDisplay.innerText =
      displayValue === "0" ? number : displayValue + number;
  }
}

function callOperator(operator) {
  if (calculatorDisplay.innerText === "Error") {
    resetAll();
  }
  const currentValue = Number(calculatorDisplay.innerText);
  if (operatorValue && waitForNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue && firstValue !== 0) {
    firstValue = currentValue;
  } else {
    // call function via object [calculate] that match attribute "operateValue"
    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.innerText = result;
    firstValue = result;
    if (firstValue === "error") {
      calculatorDisplay.innerText = "Error";
    }
  }
  operatorValue = operator;
  waitForNextValue = true;
}

function addDecimal() {
  if (waitForNextValue) return;
  // check if calculateDisplay has any "." using includes()
  if (!calculatorDisplay.innerText.includes(".")) {
    calculatorDisplay.innerText = `${calculatorDisplay.innerText}.`;
  }
}

// for each button elements in button array
inputBtn.forEach((input) => {
  // check if there is no any class of this button (0-9)
  if (input.classList.length === 0) {
    // fetch the value in "value" attribute of input [button] as argument to "setNumberValue" function
    input.addEventListener("click", () => setNumberValue(input.value));
  } else if (input.classList.contains("operator")) {
    // check if the "input" [button] has the className "operator"
    input.addEventListener("click", () => callOperator(input.value));
  } else if (input.classList.contains("decimal")) {
    input.addEventListener("click", () => addDecimal(input.value));
  }
});

function resetAll() {
  firstValue = null;
  operatorValue = "";
  waitForNextValue = false;
  calculatorDisplay.innerText = "0";
}

clearBtn.addEventListener("click", () => resetAll());
