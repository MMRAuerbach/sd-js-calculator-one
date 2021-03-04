

const display = document.querySelector('.calculator__answer');
let numbers = [null, null];
let operator = null;

const calcButtons = document.querySelectorAll('.calculator__item');
const operators = { 'add' : '+', 'substract' : '-', 'times': 'x', 'divide': ':', 'power': 'M2' };

if (calcButtons) {
    calcButtons.forEach(function(element) {
        element.addEventListener('click', function() {            
            let elNumber = null;

            if (element.hasAttribute("data-action")) {
                checkOperator = element.dataset.action;
                if (checkOperator === "solution") {
                    if (operator && numbers[1] && numbers[0]) {
                        let solution = '';
                        switch(operator) {
                            case 'add':
                                solution = (parseFloat(numbers[0]) + parseFloat(numbers[1]));
                                break;
                            case 'substract':
                                solution = (parseFloat(numbers[0]) - parseFloat(numbers[1]));
                                break;
                            case 'divide':
                                solution = (parseFloat(numbers[0]) / parseFloat(numbers[1]));
                                break;
                            case 'times':
                                solution = (parseFloat(numbers[0]) * parseFloat(numbers[1]));
                                break;
                        }
                        numbers[0] = solution;
                        numbers[1] = null;
                        operator = null;

                        addToDisplay('=' + solution);
                    }
                } else if (checkOperator === "reset") {
                    numbers[0] = null;
                    numbers[1] = null;
                    operator = null;
                    showInDisplay(0);
                } else if (checkOperator === "power" && numbers[0] && !numbers[1]) {
                    solution = parseFloat(numbers[0]) * parseFloat(numbers[0]);
                    addToDisplay('&sup2;=' + solution);
                } else if (checkOperator === "root" && numbers[0] && !numbers[1]) {
                    solution = Math.sqrt(parseFloat(numbers[0]));
                    showInDisplay('&#8730;' + numbers[0] + '=' + solution);
                } else if (checkOperator === 'plusmin' && numbers[0] && !numbers[1]) {
                    if (parseInt(numbers[0]) > 0) {
                        numbers[0] = '-' + numbers[0];
                    } else {
                        numbers[0] = numbers[0].substring(1);
                    }
                    showInDisplay(numbers[0]);
                } else if (numbers[0] && !numbers[1]) {
                    operator = checkOperator;
                    addToDisplay(operators[operator]);
                }
            } else {
                elNumber = element.dataset.number;
                addToDisplay(elNumber);
                if (numbers[1]) {
                    numbers[1] = numbers[1] + elNumber;
                } else if (operator) {
                    numbers[1] = elNumber;
                } else if (numbers[0]) {
                    numbers[0] = numbers[0] + elNumber;
                } else {
                    numbers[0] = elNumber;
                }
            }
        })
    });
}

function addToDisplay(addWhat) {
    let oldDisplay = display.innerHTML;
    if (parseFloat(oldDisplay) === 0)
        oldDisplay = '';
        
    showInDisplay(oldDisplay + addWhat);
}

function showInDisplay(showWhat) {
    display.innerHTML = showWhat;
    display.scrollLeft = 1000000;
}