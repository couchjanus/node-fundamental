// глобальный контекст выполнения
var name = "John Smith";

// блок if не создает локальной области видимости
if (name) {
    name = "Jack London"; // глобальная переменная
    console.log('Hello, ' + name);
}

console.log('Hello, ' + name); // Jack
