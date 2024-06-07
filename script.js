let formulaValue = "0";
let displayValue = "0";
let inputState = "initialized";
function setInputState(newState){
    inputState=newState;
}
let isDecimal = false;

$(".key").on("click", function (e) {
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
    console.log("Syntax key", value, "was pressed.");
    switch(value){
        case "CE":
            initialize();
            break;
        case ".":
            if(isDecimal){break}
            formulaValue=formulaValue+".";
            displayValue=displayValue+".";
            setInputState("decimal");
            isDecimal=true;
            break;
        case "=":
            operate(formulaValue, displayValue, "last value") //todo: implement a way to remember last operation used
        default:  // for four functions
            
            formulaValue=displayValue;
            displayValue=operate(formulaValue, displayValue, value);
            isDecimal=false;
            setInputState("initialized");
    }
}

function initialize() {
    formulaValue="0";
    displayValue="0";
    setInputState("initialized");
    isDecimal=false;
}

function operate(num1, num2, operation) {
    /*
    Does the calculation based on input parameters. Should be number, number, and string
    */
   switch(value){
    case "+":
        return num1+num2;
    case "-":
        return num1-num2;
    case "*":
        return num1*num2;
    case "/":
        return num1/num2;
   }
}

function updateState(){
    document.getElementById("formula").innerText=formulaValue;
    document.getElementById("display").innerText=displayValue;
    console.log(displayValue,inputState)
}