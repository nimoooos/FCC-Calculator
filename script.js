let formulaValue = "0";
let displayValue = "0";
// let inputState = "initialized";
const initialState = {
    isInitialized: true,
    isDecimal: false,
    waitingForNewNumber: true
}
let inputState = initialState;
function setInputState(newState){
    /** 
     * states are:
     * "initialized": no previous input, happens on startup and when pressing CE. Cannot take syntax as input
     * "number entry": just entered in a number; can continue accepting numbers, or receive syntax to change state
     * "syntax entry": just entered in a syntax; can accept new syntax to switch, or receive a number to change state
     * 
     * we track this by:
     * "isInitialized" flag: is this initialized? set to true on startup and CE, set to false upon anything else
     * "isDecimal" flag: is the current number a decimal number? Set to true on adding decimal, set to false on entering new number
     * "waitingForNewNumber" flag: set to true if four basic functions or equal sign was used to reset number entry; if already entering numbers, set to false
    */
    inputState.isInitialized = newState.isInitialized;
    inputState.isDecimal = newState.isDecimal;
    inputState.waitingForNewNumber = newState.waitingForNewNumber;
}
// let isDecimal = false;

function initialize() {
    formulaValue="0";
    displayValue="0";
    setInputState(initialState);
}



$(".key").on("click", function (e) {
    /**
     * Called upon keypress, and calls numberHandler or syntaxHandler
     */
    const KVPair = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "decimal": ".",
        "clear": "CE",
        "divide": "/",
        "multiply": "*",
        "subtract": "-",
        "add": "+",
        "equals": "="
    }
    const targetId = e.target.id;
    const value = KVPair[targetId];

    const isNumber = Number(value) === value;

    function updateState(){
        document.getElementById("formula").innerText=formulaValue;
        document.getElementById("display").innerText=displayValue;
        console.log(displayValue,inputState)
    }

    if (isNumber) {
        numberHandler(value);
    } else {
        syntaxHandler(value);
    }
    updateState();
})

function numberHandler(value) {
    console.log("Number key", value, "was pressed.");
    if(inputState=="initialized"){
        displayValue=`${value}`;
        setInputState("number");
    } else if(displayValue=="0" && value==0) {
        setInputState("number");
    } else {
        displayValue = displayValue+`${value}`;
        setInputState("number");
    }
}

function syntaxHandler(value){
    function operate(num1, num2, operation) {
        /*
        Does the calculation based on input parameters. Should be number, number, and string
        */
       switch(operation){
        case "+":
            return Number(num1)+Number(num2);
        case "-":
            return Number(num1)-Number(num2);
        case "*":
            return Number(num1)*Number(num2);
        case "/":
            return Number(num1)/Number(num2);
       }
    }
    console.log("Syntax key", value, "was pressed.");
    switch(value){
        case "CE":
            initialize();
            break;
        case ".":
            console.log("Decimal was pressed. No action taken.")
            // if(isDecimal){break}
            // formulaValue=formulaValue+".";
            // displayValue=displayValue+".";
            // setInputState("decimal");
            // isDecimal=true;
            // break;
        case "=":
            operate(formulaValue, displayValue, "last value") //todo: implement a way to remember last operation used
        default:  // for four functions
            
            formulaValue=displayValue;
            displayValue=operate(formulaValue, displayValue, value);
            // isDecimal=false;
            setInputState("initialized");
    }
}
