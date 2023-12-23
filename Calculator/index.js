//Selecting the result section
let waitPower = false;
function getHistory() {
  return  document.getElementById("history-value").innerText;
}

function printHistoryValue(num) {
  document.getElementById("history-value").innerText = num;

}

function getResult() {
    return document.getElementById("result-value").innerText;
}
function printResultValue(num) {
    if(num === ""){
        document.getElementById("result-value").innerText = num
    }else{
        document.getElementById("result-value").innerText = getFormSepdNum(num)
    }
  
}
function getFormSepdNum(num) {
    if(num == "-"){
        return "";
    }
    var n = Number(num)
    var value = n.toLocaleString('en')
    return value
}

function reverseNumFormat(num) {
    return Number(num.replace(/,/g, ""))
}

//Selecting the Operators

var operators = document.querySelectorAll(".operator");
for (var i = 0;  i < operators.length; i++) {
     operators[i].addEventListener("click", function() {
         if(this.id == "clear"){
             printHistoryValue("");
             printResultValue("");
         }
         if(this.id == "backspace"){
             var output = reverseNumFormat(getResult()).toString()
             if(output)
             output = output.substr(0,output.length -1)
             printResultValue(output)
         }else{
             var output = getResult();
             var history = getHistory();
             if(output == "" && history !== ""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length -1)
                }
             }
             if(output !== "" || history !== ""){
                 output = output == ""?
                 output:reverseNumFormat(output);
                 history = history + output;
                 if(this.id == "="){
                     var result = eval(history)
                     printResultValue(result)
                     printHistoryValue("");
                 }else if (this.id == "sqr") {
                    var output = reverseNumFormat(getResult());
                    var result = output * output;
                    printResultValue(result);
                    printHistoryValue(output + "²");
                } else if (this.id == "sqrt") {
                    var output = reverseNumFormat(getResult());
                    var result = Math.sqrt(output);
                    printResultValue(result);
                    printHistoryValue("√(" + output + ")");

                } else if (this.id == "power") {
                    waitPower = true;
                    // var output = reverseNumFormat(getResult());
                    // printHistoryValue(`${output}^`)
                    // var result = Math.pow(output, power);
                    // printResultValue(result);
                    // printHistoryValue(output + "^" + power);
                }
                        else{
                     history = history + this.id
                     printHistoryValue(history);
                     printResultValue("");
                 }
             }
         }
     })
}
var numbers = document.querySelectorAll(".btn");
for (var i = 0;  i < numbers.length; i++) {
     numbers[i].addEventListener("click", function() {   
        var output = reverseNumFormat(getResult())
         if(waitPower) {
            var output = reverseNumFormat(getResult());
            var power = this.id;

            var result = Math.pow(output, power);
            printResultValue(result);
            printHistoryValue(output + "^" + power);
            waitPower = false;
         }
         else if(output !== NaN){
          output= output + this.id
          printResultValue(output);
         }
     })
}