

const display = document.querySelector('.calculator__answer');
let chosenNumberOne = null;
let chosenNumberTwo = null;
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
                    if (operator && chosenNumberTwo && chosenNumberOne) {
                        let solution = '';
                        switch(operator) {
                            case 'add':
                                solution = (parseFloat(chosenNumberOne) + parseFloat(chosenNumberTwo));
                                break;
                            case 'substract':
                                solution = (parseFloat(chosenNumberOne) - parseFloat(chosenNumberTwo));
                                break;
                            case 'divide':
                                solution = (parseFloat(chosenNumberOne) / parseFloat(chosenNumberTwo));
                                break;
                            case 'times':
                                solution = (parseFloat(chosenNumberOne) * parseFloat(chosenNumberTwo));
                                break;
                        }
                        
                        addToDisplay('=' + solution);
                    }
                } else if (checkOperator === "reset") {
                    chosenNumberOne = null;
                    chosenNumberTwo = null;
                    operator = null;
                    showInDisplay(0);
                } else if (checkOperator === "power" && chosenNumberOne && !chosenNumberTwo) {
                    solution = parseFloat(chosenNumberOne) * parseFloat(chosenNumberOne);
                    addToDisplay('&sup2;=' + solution);
                } else if (checkOperator === "root" && chosenNumberOne && !chosenNumberTwo) {
                    solution = Math.sqrt(parseFloat(chosenNumberOne));
                    showInDisplay('&#8730;' + chosenNumberOne + '=' + solution);
                } else if (checkOperator === 'plusmin' && chosenNumberOne && !chosenNumberTwo) {
                    if (parseInt(chosenNumberOne) > 0) {
                        chosenNumberOne = '-' + chosenNumberOne;
                    } else {
                        chosenNumberOne = chosenNumberOne.substring(1);
                    }
                    showInDisplay(chosenNumberOne);
                } else if (chosenNumberOne && !chosenNumberTwo) {
                    operator = checkOperator;
                    addToDisplay(operators[operator]);
                }
            } else {
                elNumber = element.dataset.number;
                addToDisplay(elNumber);
                if (chosenNumberTwo) {
                    chosenNumberTwo = chosenNumberTwo + elNumber;
                } else if (operator) {
                    chosenNumberTwo = elNumber;
                } else if (chosenNumberOne) {
                    chosenNumberOne = chosenNumberOne + elNumber;
                } else {
                    chosenNumberOne = elNumber;
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
}