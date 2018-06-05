function multiply(x, y) {
    return x * y;
}

function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}

// Когда движок только начинает выполнять этот код, стек вызовов пуст.

printSquare(5);

// Трассировка стека после возникновения ошибки

function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}
function bar() {
    foo();
}
function start() {
    bar();
}
start();


// function foo() {
//     foo();
// }
// foo();
