const userInput = document.getElementById("userInput");

var expression = '';

function press(num) {
    expression += num;
    userInput.value = expression;
}

function erase() {
    expression = '';
    userInput.value = expression;
}

function solve() {
    userInput.value = eval(expression);
    expression = userInput.value;
}