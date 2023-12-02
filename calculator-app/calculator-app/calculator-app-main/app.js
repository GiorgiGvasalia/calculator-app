const theme = document.querySelector(".change-theme");
const themeBtn = document.querySelector(".theme-oval");
const deleteBtn = document.querySelector(".delete");
const displayRes = document.querySelector(".result");
const displayScreen = document.querySelector(".display-result");
const container = document.querySelector(".container");
const body = document.body;
const header = document.querySelector(".header");
const buttons = document.querySelectorAll(".digit");
const equals = container.querySelector(".equal");
const reset = container.querySelector(".reset");

let currInput = "";

function displayArguments(value) {
  let lastChar = currInput.length - 1;
  const isLastCharOperator =
    currInput[lastChar] === "+" ||
    currInput[lastChar] === "-" ||
    currInput[lastChar] === "*" ||
    currInput[lastChar] === "/";

  const regex = /(\d{3})(?=\d)/g;

  if (isNaN(value)) {
    if (isLastCharOperator) {
      return;
    } else {
      currInput += value;
      displayRes.value = currInput;
    }
  } else {
    if (isLastCharOperator) {
      currInput += value;
      displayRes.value = currInput.replace(regex, "$1,");
    } else {
      currInput += value;
      displayRes.value = currInput.replace(regex, "$1,");
    }
  }
}

// CHECKING IF ARRAY MEMBER IS NUMBER THEN CHECKING WHICH operator is current

function evaluateArray(arr) {
  let result = 0;
  let currentOperator = null;

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (typeof current === "number") {
      if (currentOperator === null) {
        result = current;
      } else if (currentOperator === "+") {
        result += current;
      } else if (currentOperator === "-") {
        result -= current;
      } else if (currentOperator === "/") {
        result /= current;
      } else if (currentOperator === "x") {
        result *= current;
      }
    } else if (typeof current === "string") {
      currentOperator = current;
    }
  }
  return result;
}

// CALCULATION

function calc() {
  // regex for operators
  const regexForOpeartors = /\d+(\.\d+)?|([+\-\/x])/g;

  // replacing commas for calculation
  const parts = displayRes.value.replaceAll(",", "").match(regexForOpeartors);

  // CONVERTING ARRAY MEMBERS TO NUMBERS

  const toNumber = parts.map(function (element) {
    return isNaN(element) ? element : +element;
  });

  const finalResult = evaluateArray(toNumber);

  // DISPLAYING FINAL RESULT

  if (typeof finalResult !== "undefined") {
    displayRes.value = finalResult;
    currInput = finalResult;
    console.log(displayRes.value);
  } else {
    handleError(displayRes.value);
    displayRes.value = "";
  }
}

function del() {
  currInput = currInput.slice(0, -1);
  displayRes.value = currInput;
}

function handleError(value) {
  if (value === "0" || value.length === 0) {
    displayScreen.classList.add("error");
  } else {
    displayScreen.classList.remove("error");
  }
  return;
}

function resetBtn() {
  currInput = "";
  displayRes.value = "";
  displayScreen.classList.remove("error");
}

// THEME CHANGE

function changeTheme() {
  const elementsToUpdate = [
    body,
    displayScreen,
    displayRes,
    container,
    buttons,
    header,
    equals,
    deleteBtn,
    reset,
    themeBtn,
    theme,
  ];

  currentTheme = (currentTheme % 3) + 1;

  elementsToUpdate.forEach((element) => {
    if (element.length > 1) {
      element.forEach((el) => {
        el.classList.remove(
          `theme-${currentTheme === 1 ? 3 : currentTheme - 1}`
        );
        el.classList.add(`theme-${currentTheme}`);
      });
    } else {
      element.classList.remove(
        `theme-${currentTheme === 1 ? 3 : currentTheme - 1}`
      );
      element.classList.add(`theme-${currentTheme}`);
    }
  });
}

// EVENT LISTENERS

container.addEventListener("click", (e) => {
  const btnDigit = e.target.closest(".digit");

  if (!btnDigit) return;

  if (currInput.startsWith(".") || currInput.startsWith("00")) return;

  displayArguments(btnDigit.textContent);
});

let currentTheme = 1;

theme.addEventListener("click", changeTheme);
equals.addEventListener("click", calc);
deleteBtn.addEventListener("click", del);
reset.addEventListener("click", resetBtn);
