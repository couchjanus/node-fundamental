// Всегда объявляйте локальные переменные перед их использованием. 
// если вы используете JSHint, он должен сообщить вам о синтаксической ошибке, если переменная не была объявлена. 

// Проблема необъявленных переменных:

/* если вы не объявляете локальную переменную с помощью ключевого слова var, она получает глобальную область видимости */
var name = "Michael Jackson";

function showCelebrityName() {
    console.log(name);
}

function showOrdinaryPersonName() {
    name = "Johnny Evers";
    console.log(name);
}

showCelebrityName(); // Michael Jackson

// переменная name не была объявлена в функции, поэтому она изменяет глобальную

showOrdinaryPersonName(); // Johnny Evers
showCelebrityName(); // Johnny Evers

/* Решением данной проблемы будет объявление локальной переменной с помощью ключевого слова var */
function showOrdinaryPersonName() {
    var name = "Johnny Evers";
    console.log(name);
}

var name = "Paul";
function users() {
    var name = "Jack";
    console.log(name);
}
users(); // Jack