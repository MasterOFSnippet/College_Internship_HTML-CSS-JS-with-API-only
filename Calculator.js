// function calculate(operator){

//     let num1=parseFloat(document.getElementById("num1").value);
//     let num2=parseFloat(document.getElementById("num2").value);
//     let result;
//     if(isNaN(num1)||isNaN(num2)){

//         alert("Please enter the valid number !!!!");
//         return result;
//     }
//     if(operator==="+"){

//         result=num1+num2;

//     }else if (operator==="-"){

//         result=num1-num2;

//     }
//     else  if(operator==="."){

//         result=num1*num2;

//     }
//     // else  if(operator==="/"){

//     //     result=num1/num2;

//     // }
//     else if(operator==="/"){
//         if(num2===0){
//             alert("cannot divide by 0")
//             return;
//         }
//         result=num1/num2;
//     }

//     else{

//         alert("Invalid Operator!");
//         return;
//     }
//     document.getElementById("result").innerText="Result "+result;


// }

/// Better Version---------------------
        // Initialize history array
        let calculationHistory = [];
        
        function calculate(operator) {
            let num1 = parseFloat(document.getElementById("num1").value);
            let num2 = parseFloat(document.getElementById("num2").value);
            let resultElement = document.getElementById("result");
            
            // Validate inputs
            if (isNaN(num1) || isNaN(num2)) {
                showError("Please enter valid numbers!");
                return;
            }
            
            let result;
            let operation;
            
            switch(operator) {
                case '+':
                    result = num1 + num2;
                    operation = `${num1} + ${num2} = ${result}`;
                    break;
                case '-':
                    result = num1 - num2;
                    operation = `${num1} - ${num2} = ${result}`;
                    break;
                case '*':
                    result = num1 * num2;
                    operation = `${num1} × ${num2} = ${result}`;
                    break;
                case '/':
                    if (num2 === 0) {
                        showError("Cannot divide by zero!");
                        return;
                    }
                    result = num1 / num2;
                    operation = `${num1} ÷ ${num2} = ${result}`;
                    break;
                default:
                    showError("Invalid operation!");
                    return;
            }
            
            // Display result
            resultElement.textContent = result;
            
            // Add to history
            addToHistory(operation);
        }
        
        function addToHistory(operation) {
            calculationHistory.push(operation);
            updateHistoryDisplay();
        }
        
        function updateHistoryDisplay() {
            const historyList = document.getElementById("calc-history");
            historyList.innerHTML = "";
            
            // Display latest 5 calculations
            const recentHistory = calculationHistory.slice(-5);
            
            recentHistory.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                historyList.appendChild(li);
            });
        }
        
        function clearHistory() {
            calculationHistory = [];
            updateHistoryDisplay();
        }
        
        function clearFields() {
            document.getElementById("num1").value = "";
            document.getElementById("num2").value = "";
            document.getElementById("result").textContent = "0";
        }
        
        function showError(message) {
            const resultElement = document.getElementById("result");
            resultElement.textContent = "Error";
            
            // Temporary error display
            setTimeout(() => {
                alert(message);
                resultElement.textContent = "0";
            }, 100);
        }
        
        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                calculate('=');
            } else if (event.key === 'Escape') {
                clearFields();
            } else if (event.key === '+') {
                calculate('+');
            } else if (event.key === '-') {
                calculate('-');
            } else if (event.key === '*') {
                calculate('*');
            } else if (event.key === '/') {
                event.preventDefault();
                calculate('/');
            }
        });
    