const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

window.onload = function() {
    const savedResult = localStorage.getItem('lastResult');
    const savedHistory = localStorage.getItem('lastHistory');
    if(savedResult) {
        display.value = savedResult;
    }
    if(savedHistory) {
        historyDisplay.innerText = savedHistory;
    }
}

function appendToDisplay(input) {

    if(display.value === "ERROR") {
        display.value = "";
        historyDisplay.innerText = "";
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    historyDisplay.innerText = "";
}

function deleteLastChar() {

    if(display.value === "ERROR") {
        display.value = "";
        historyDisplay.innerText = "";
    } else {
        display.value = display.value.toString().slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value;
        if(expression === "") return;

        let result = eval(expression);

        if (!isFinite(result) || isNaN(result)) {
            throw new Error("Division by Zero");
        }

        let historyText = expression + " =";
        historyDisplay.innerText = historyText; 
        display.value = result;

        localStorage.setItem('lastResult', result);  
        localStorage.setItem('lastHistory', historyText); 

    } catch (error) {
        display.value = "ERROR";
        historyDisplay.innerText = "";
    }
}
