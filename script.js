// DOM ELEMENT SELECTORS
// calc functions
const display = document.querySelector('.display');
const ac = document.querySelector('.ac');
const pm = document.querySelector('.p-m');
const percent  = document.querySelector('.percent');

// calc numbers
const decimal = document.querySelector('.decimal');
const number0 = document.querySelector('.number-0');
const number1 = document.querySelector('.number-1');
const number2 = document.querySelector('.number-2');
const number3 = document.querySelector('.number-3');
const number4 = document.querySelector('.number-4');
const number5 = document.querySelector('.number-5');
const number6 = document.querySelector('.number-6');
const number7 = document.querySelector('.number-7');
const number8 = document.querySelector('.number-8');
const number9 = document.querySelector('.number-9');
const numpadArray = [
  number0, number1, number2, number3, number4,
  number5, number6, number7, number8, number9
];

// calc operations
const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const equal = document.querySelector('.equal');

// calc landscape functions
const ozToL = document.querySelector('.kw-to-bhp');
const pi = document.querySelector('.pi');
const stoneToKg = document.querySelector('.stone-to-kg');
const Square = document.querySelector('.square');
const inchToCm = document.querySelector('.inch-to-cm');
const squareRoot = document.querySelector('.square-root');
const kphToMph = document.querySelector('.kph-to-mph');
const cubed = document.querySelector('.cubed');
const farToCel = document.querySelector('.far-to-cel');
const random = document.querySelector('.random');


// FUNCTIONS
// Display GETTER
const getDisplayValueAsNum = () => {
    return parseFloat(display.textContent);
};

// Display SETTER
const setDisplayValueAsString = (valueStr) => {
    display.textContent = valueStr;
};

// gets current displayed num if one exists then adds clicked num converted 
// to a str and adds to the end of the current displayed str.
const handleNumberClick = (numStr) => {
    const currentDisplayStr = display.textContent;
    if (currentDisplayStr === '0') {
      setDisplayValueAsString(numStr);
    } else {
      setDisplayValueAsString(currentDisplayStr + numStr);
    }
};


// EVENT LISTENERS
// Adds Event Listeners to num pad and decimal buttons
for (let i=0; i < numpadArray.length; i++) {
    const numBTN = numpadArray[i];
    // passes clicked num as string to handleNumberClick
    numBTN.addEventListener('click', () => {
      handleNumberClick(i.toString());
    });
}

// adds a . to end of current display value unless one is already present
decimal.addEventListener('click', () => {
    currentDisplayStr = display.textContent;
        if (!currentDisplayStr.includes('.')) {
            setDisplayValueAsString(currentDisplayStr + '.');
        }
});

// const getValueAsStr = () => valueEl.textContent.split(',').join('');
  