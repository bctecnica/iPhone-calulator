// DOM ELEMENT SELECTORS
// calc functions.
const display = document.querySelector('.display');
const ac = document.querySelector('.ac');
const pm = document.querySelector('.p-m');
const percent  = document.querySelector('.percent');

// calc numbers.
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

// calc operations.
const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const equal = document.querySelector('.equals');

// calc landscape functions.
const kwToBhp = document.querySelector('.kw-to-bhp');
const pi = document.querySelector('.pi');
const stoneToKg = document.querySelector('.stone-to-kg');
const Square = document.querySelector('.square');
const inchToCm = document.querySelector('.inches-to-cm');
const squareRoot = document.querySelector('.square-root');
const kphToMph = document.querySelector('.kph-to-mph');
const cubed = document.querySelector('.cubed');
const farToCel = document.querySelector('.far-to-cel');
const random = document.querySelector('.random');


// VARIABLES
let valueInMemory = null;
let operatorInMemory = null;


// FUNCTIONS
// Display GETTER.
const getDisplayValue = () => {
    return parseFloat(display.textContent);
};

// Display SETTER.
const setDisplayValue = (valueStr) => {
    display.textContent = valueStr.toString().substring(0, 16);
    if(display.textContent.length < 8){
        display.style.fontSize = '5rem';
    }
    if(display.textContent.length >= 8){
        display.style.fontSize = '3rem';
    }
    if(display.textContent.length >= 13){
        display.style.fontSize = '2.4rem';
    }
    if(screen.width >= 600){
        display.style.fontSize = '2.8rem';
    }
    
};

// listens for display size changes and adjusts fonts accordingly.
const resize_ob = new ResizeObserver(function(entries) {
	let rect = entries[0].contentRect;
	let width = rect.width;
    if(width <= 600 && display.textContent.length < 8){
        display.style.fontSize = '5rem';
    }
    if(width <= 600 && display.textContent.length >= 8){
        display.style.fontSize = '3rem';
    }
    if(width <= 600 && display.textContent.length >= 13){
        display.style.fontSize = '2.4rem';
    }
    if(width >= 600){
        display.style.fontSize = '2.8rem';
    }
});

// start observing for resize
resize_ob.observe(document.querySelector("html"));

// gets current displayed num if one exists then adds clicked num converted 
// to a str and adds to the end of the current displayed str.
const handleNumberClick = (numStr) => {
    const currentDisplayStr = display.textContent;
    if (currentDisplayStr === '0') {
      setDisplayValue(numStr);
    } else {
      setDisplayValue(currentDisplayStr + numStr);
    }
};

// used to string together multiple calculations by sorting previous answer to a variable.
const handleOperatorClick = (operation) => {
    const currentDisplayValue = display.textContent;
    if (!valueInMemory) {
      valueInMemory = currentDisplayValue;
      operatorInMemory = operation;
      setDisplayValue('0');
      return;
    }
    valueInMemory = getResultOfOperation();
    operatorInMemory = operation;
    setDisplayValue('0');
};

// gets the stored number in memory and calculates an answer from operator selected and 
// currently displayed number.
const getResultOfOperation = () => {
    const currentDisplayValue = getDisplayValue();
    const valueInMemoryNum = parseFloat(valueInMemory);
    let newValue;
    if (operatorInMemory === 'addition') {
      newValue = valueInMemoryNum + currentDisplayValue;
    } else if (operatorInMemory === 'subtraction') {
      newValue = valueInMemoryNum - currentDisplayValue;
    } else if (operatorInMemory === 'multiplication') {
      newValue = valueInMemoryNum * currentDisplayValue;
    } else if (operatorInMemory === 'division') {
      newValue = valueInMemoryNum / currentDisplayValue;
    }
    return newValue.toString();
};


// EVENT LISTENERS

// remove last number if display is clicked
display.addEventListener('click', () => {
    setDisplayValue(display.textContent.slice(0, -1));
    if (display.textContent === ''){
        setDisplayValue('0')
    }
});

//-- numpad--
// Adds Event Listeners to num pad and decimal buttons.
for (let i=0; i < numpadArray.length; i++) {
    const numBTN = numpadArray[i];
    // passes clicked num as string to handleNumberClick.
    numBTN.addEventListener('click', () => {
      handleNumberClick(i.toString());
    });
}

// adds a . to end of current display value unless one is already present in the display.
decimal.addEventListener('click', () => {
    currentDisplayStr = display.textContent;
        if (!currentDisplayStr.includes('.')) {
            setDisplayValue(currentDisplayStr + '.');
        }
});

// --calc functions--
// clears display
ac.addEventListener('click', () => {
    setDisplayValue('0');
    valueInMemory = null;
    operatorInMemory = null;
});

// makes display a minus number if positive or vice versa
pm.addEventListener('click', () => {
    const currentDisplayValueAsNum = getDisplayValue();
    const currentDisplayValueAsString = display.textContent;

    if (currentDisplayValueAsString === '-') {
        setDisplayValue('0');
        return;   
    }
    if (currentDisplayValueAsNum >= 0) {
        setDisplayValue('-' + currentDisplayValueAsString);
        if (display.textContent === '-0') {
            setDisplayValue('-');
        }
    } else {
        setDisplayValue(currentDisplayValueAsString.substring(1));
    }
});

// returns 1% of current display value
percent.addEventListener('click', () => {
    setDisplayValue(getDisplayValue() / 100);
    valueInMemory = null;
    operatorInMemory = null;
});
  
// --operators--
addition.addEventListener('click', () => {
    handleOperatorClick('addition');
});
subtraction.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});
multiplication.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});
division.addEventListener('click', () => {
    handleOperatorClick('division');
});

// returns operation calculation to the display
equal.addEventListener('click', () => {
if (valueInMemory) {
    setDisplayValue(getResultOfOperation());
    valueInMemory = null;
    operatorInMemory = null;
    }
});

// --landscape operators--
// conversions
stoneToKg.addEventListener('click', () => {
    setDisplayValue(getDisplayValue() * 6.350);
});

farToCel.addEventListener('click', () => {
    setDisplayValue((getDisplayValue() -32) * 5 / 9);
});

inchToCm.addEventListener('click', () => {
    setDisplayValue(getDisplayValue() * 2.54);
});

kphToMph.addEventListener('click', () => {
    setDisplayValue(getDisplayValue() * 0.621);
});

kwToBhp.addEventListener('click', () => {
    setDisplayValue(getDisplayValue() * 1.341);
});

// math
squareRoot.addEventListener('click', () => {
    setDisplayValue(Math.sqrt(getDisplayValue()));
});

Square.addEventListener('click', () => {
    setDisplayValue(Math.pow(getDisplayValue(), 2));
});

cubed.addEventListener('click', () => {
    setDisplayValue(Math.pow(getDisplayValue(), 3));
});

pi.addEventListener('click', () => {
    setDisplayValue(Math.PI);
});

random.addEventListener('click', () => {
    setDisplayValue(Math.random());
});







