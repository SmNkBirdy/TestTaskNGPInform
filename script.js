// объявление переменных
var list_of_ints = new Array();
var arrayLenghtInput = document.getElementById("arrayLenghtInput");
var arrayDisplay = document.getElementById("arrayDisplay");
var answerDisplay = document.getElementById("answerDisplay");
var rndMin = document.getElementById("rndMin");
var rndMax = document.getElementById("rndMax");

//решение задачи
function completeTask(){
    if(list_of_ints.length == 3){
        answer = list_of_ints[0] * list_of_ints[1] * list_of_ints[2]
    } else {
        //сортируем массив
        list_of_ints.sort(function(a, b) {return a - b;});
        //сравниваем комбинацию 2х первых и последнего элемента с комбинацией 3х последних, возможно я не прав и решение не правильное, но это самое простое решение.
        firstPosibleAnswer = list_of_ints[list_of_ints.length - 1] * list_of_ints[list_of_ints.length - 2] * list_of_ints[list_of_ints.length - 3];
        secondPosibleAnswer = list_of_ints[0] * list_of_ints[1] * list_of_ints[list_of_ints.length - 1];
        if(firstPosibleAnswer > secondPosibleAnswer){
            drawAnswer(list_of_ints[list_of_ints.length - 1],list_of_ints[list_of_ints.length - 2],list_of_ints[list_of_ints.length - 3], firstPosibleAnswer);
            console.log("Ответ:" + firstPosibleAnswer);
        } else {
            drawAnswer(list_of_ints[0],list_of_ints[1],list_of_ints[list_of_ints.length - 1], secondPosibleAnswer);
            console.log("Ответ:" + secondPosibleAnswer);
        }
        console.log("Отсортированный массив:" + list_of_ints);
    }
}
//решение кончается дальше взаимодействие пользователя с страницей и т.д.

//отображение ответа
function drawAnswer(firstNum, secondNum, thirdNum, answer){
    answerDisplay.innerHTML = "<p>Максимальный результат: " + answer + "<br> получается при произведении чисел: " + firstNum + ", " + secondNum + ", " + thirdNum + ".</p>";
}

//очистка блоков
function clearBlocks(){
    arrayDisplay.innerHTML = "";
    answerDisplay.innerHTML = "";
}

//кнопка генерации массива из случайных чисел
function randomGeneration(){
    list_of_ints = new Array();
    arrayLenght = arrayLenghtInput.value;
    //генерация массива
    for (let i = 0; i < parseInt(arrayLenght); i++) {
        list_of_ints.push(Math.round(Math.random() * (parseInt(rndMax.value,10) - parseInt(rndMin.value,10)) + parseInt(rndMin.value,10)));
    }
    drawArray();
    completeTask()
}

//кнопка ручного ввода
function manualInput(){
    clearBlocks();
    cacheString = "";
    for (let i = 0; i < arrayLenghtInput.value; i++) {
        cacheString += "<input type='text' class='inputsOfArrayNumbers'>";
    }
    arrayDisplay.innerHTML += cacheString + "<br><button onclick='generateManualArray()' class='controlButtons'>Получить ответ</button>";
}

function generateManualArray(){
    list_of_ints = new Array();
    inputs = document.getElementsByClassName("inputsOfArrayNumbers");
    for (let i = 0; i < inputs.length; i++) {
        list_of_ints.push(parseInt(inputs[i].value,10));
    }
    completeTask();
}

//отображение массива
function drawArray(){
    clearBlocks();
    /*if(list_of_ints.length < 20){
        for (let i = 0; i < list_of_ints.length; i++) {
            arrayDisplay.innerHTML += "<div class='arrayElement'>" + list_of_ints[i] + "</div>";
        }
    }*/
    //оптимизация позволила выводить на странице 500000 элементов массива, но я ограничил до 100000.
    cacheString = "";
    if(list_of_ints.length < 100000){
        cacheString = "<p>Массив:</p>";
        for (let i = 0; i < list_of_ints.length; i++) {
            cacheString += "<div class='arrayElement'>" + list_of_ints[i] + "</div>";
        }
        cacheString += "<p>Отсортированный массив можно посмотреть в консоли.</p>";
    } else {
        cacheString = "Массив слишком длинный по этому посмотреть его можно только в консоли."
    }
    arrayDisplay.innerHTML += cacheString;
}
