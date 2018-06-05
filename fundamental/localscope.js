// глобальный контекст выполнения
var name = "John Smith";

function showName() {
    var name = "Jack London"; // локальная переменная, доступна только внутри функции
    console.log('Hello, ' + name); // Hello, Jack London
}

console.log('Hello, ' + name); // глобальная переменная


showName();  // Hello, Jack London

