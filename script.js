let formulaValue = "0";
let displayValue = "0";
let operator = "initialized"

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
    if(operator=="initialized"){
        displayValue=`${value}`;
        operator="number";
    } else {
    displayValue = displayValue+`${value}`;
    operator="number";
    }
}

function syntaxHandler(value){
    console.log("Syntax key", value, "was pressed.");
    switch(value){
        case "CE":
            formulaValue="0";
            displayValue="0";
            operator="initialized";
        case "decimal":
            formulaValue=formulaValue+".";
            displayValue=displayValue+".";
            operator="decimal";

    }
}

function updateState(){
    document.getElementById("formula").innerText=formulaValue;
    document.getElementById("display").innerText=displayValue;
    console.log(displayValue,operator)
}