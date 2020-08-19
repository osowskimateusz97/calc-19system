class Calculator {
  constructor(previousElement, currentElement) {
    this.previousOperandEl = previousElement;
    this.currentOperandEl = currentElement;
    this.clear();
  }
  //clear store
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  //delete last number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //apennd number to result bar
  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  //compute operation
  compute() {
    let computation;
    //parse number to 19  decimal system
    const prev = parseInt(this.previousOperand, 19);
    const current = parseInt(this.currentOperand, 19);

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = parseInt(computation, 10).toString(19);
    this.operation = undefined;
    this.previousOperand = "";
  }
  //get number to display
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    return stringNumber;
  }
  //update DOM
  updateDisplay() {
    this.currentOperandEl.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandEl.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandEl.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousEl = document.querySelector("[data-previous]");
const currentEl = document.querySelector("[data-current]");

// create instance of Calculator with default value
const calculator = new Calculator(previousEl, currentEl);

//add event listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
