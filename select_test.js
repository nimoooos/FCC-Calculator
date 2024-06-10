console.log("loading test selector...")
let shadowRoot = document.getElementById("fcc_test_suite_wrapper").shadowRoot;
console.log(shadowRoot);

setTimeout(function(){
    let selector = shadowRoot.getElementById("test-suite-selector");
    console.log(selector);
    selector.value="javascript-calculator";
    let testButton = shadowRoot.getElementById("fcc_test_message-box-rerun-button");
    testButton.click();

    setTimeout(function(){
        let testResultButton = shadowRoot.getElementById("fcc_test_button");
        testResultButton.click();
    },5000)
}, 500);

// let selector = shadowRoot.getElementById("test-suite-selector")
// console.log(selector);
