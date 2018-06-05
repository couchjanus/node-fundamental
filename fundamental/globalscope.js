// globalscope.js

// <Объект> Глобальный объект пространства имен.

// В браузерах, область верхнего уровня является глобальной областью.

// Это означает, что в браузерах, если вы находитесь в глобальной области то var something будет определять глобальную переменную.

// В Node.js это происходит по-другому. Область верхнего уровня не глобальна; var something внутри модуля Node.js будет локальным для этого модуля.
// глобальный объект может быть недоступен в явном виде 

// В браузерах присваивая или читая глобальную переменную, мы, фактически, работаем со свойствами window.

// var greeting = require("./greeting");

global.name = "Red Cat";

global.console.log(global.name);

console.log(global);

// console.log(greeting.getMessage());

var a = 5; // объявление var создаёт свойство window.a
// console.log( window.a ); // 5

// Создать переменную можно и явным присваиванием в window:

// window.a = 5;
console.log( a ); // 5


// примеры объявления глобальных переменных:
var myName = "Richard";

// или
firstName = "Richard";

// или
var name; 

/* доступ к глобальной переменной можно получить также через объект window */
// console.log(window.myName); // Richard;
// console.log("myName" in window); // true
// console.log("firstName" in window); // true

// Переменная, инициализированная без ключевого слова var, также имеет в глобальную область видимости:


function showAge() {
    age = 90;
    console.log(age);
}
showAge();
console.log(age); // 90

