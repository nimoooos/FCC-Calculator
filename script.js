let formulaValue = "0";
let displayValue = "0";
// let inputState = "initialized";
const initialState = {
    isDecimal: false,
    waitingForNewNumber: true,
    lastNumber: null,
    lastOperation: null
}
let inputState = {};
setInputState(initialState);
function setInputState(newState) {
    /** 
     * copies the values from newState
     * 
     * we track states with following flags:
     * "isInitialized" flag: is this initialized? set to true on startup and CE, set to false upon anything else
     * "isDecimal" flag: is the current number a decimal number? Set to true on adding decimal, set to false on entering new number
     * "waitingForNewNumber" flag: set to true if four basic functions or equal sign was used to reset number entry; if already entering numbers, set to false
    */
    // console.log(newState);
    for (let key in newState) {
        // console.log(`inputState[${key}] = ${newState[key]}`);
        inputState[key] = newState[key];
    }
}

function initialize() {
    formulaValue = "0";
    displayValue = "0";
    setInputState(initialState);
}

$(".key").on("click", function (e) {
    /**
     * Called upon keypress, handles input, then updates display
     */
    const KVPair = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
        "decimal": ".", "clear": "CE", "divide": "/", "multiply": "*", "subtract": "-", "add": "+", "equals": "="
    }
    const value = KVPair[e.target.id];  // convert keypress into value
    const isNumber = Number(value) === value;  // if value is number, return true

    function updateHTML() {
        /**
         * update formula and display elements
         */
        document.getElementById("formula").innerText = formulaValue;
        document.getElementById("display").innerText = displayValue;
        console.log(inputState);
    }

    if (value == "CE") {
        console.log("CE was pressed.");
        initialize();
    } else if (isNumber) {
        numberHandler(value);
    } else {
        syntaxHandler(value);
    }
    updateHTML();
})


function numberHandler(value) {
    /**
     * Three main states-- initialized, inputting a new number, and continuing an existing number
     */
    console.log("Number key", value, "was pressed.");

    if (inputState.waitingForNewNumber) {  //if initial state or inputting new number
        displayValue = String(value);
        setInputState({waitingForNewNumber:false});
    } else if (displayValue=="0", value==0) {
        // handle consecutive zero with no action
    } else {  // continuing an existing number
        displayValue = displayValue+String(value);
    }
}

function syntaxHandler(value) {
    function operate(num1, operation, num2) {
        /*
        Does the calculation based on input parameters. Should be number, number, and string
        */
        switch (operation) {
            case "+":
                return Number(num1) + Number(num2);
            case "-":
                return Number(num1) - Number(num2);
            case "*":
                return Number(num1) * Number(num2);
            case "/":
                return Number(num1) / Number(num2);
        }
    }

    console.log("Syntax key", value, "was pressed.");
    if (value == ".") {
        console.log("Decimal was pressed.");
        if (!inputState.isDecimal){
            displayValue = String(displayValue)+".";    
            setInputState({isDecimal:true});
        } else {
            // cannot add another decimal point
        }
        
        
    } else if (value == "=") {
        console.log("Equal sign was pressed. No action taken.");
    } else {
        console.log("Four Functions key was pressed. No action taken.");
        if (inputState.lastNumber==null && inputState.lastOperation==null){
            // first operation key after initializing
            inputState.lastNumber=displayValue;
            
        }
    }

}
