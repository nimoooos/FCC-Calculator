let shadowRoot = document.getElementById("fcc_test_suite_wrapper").shadowRoot;

setTimeout(function(){
    let selector = shadowRoot.getElementById("test-suite-selector");
    selector.value = "javascript-calculator";
    let testButton = shadowRoot.getElementById("fcc_test_message-box-rerun-button");
    setTimeout(function(){
        testButton.click();
    },500)

    setTimeout(function(){
        let testResultButton = shadowRoot.getElementById("fcc_test_button");
        testResultButton.click();
    },5000)
}, 500);

// let selector = shadowRoot.getElementById("test-suite-selector")
// console.log(selector);
