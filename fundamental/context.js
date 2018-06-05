// context.js глобальный контекст выполнения

var hello = 'Hello';

var user = function() { 
    // контекст выполнения функции
    var name = 'John Smith';

    var getName = function() { 
        // контекст выполнения функции
        return name;
    }

    var sayHello = function() { 
        // контекст выполнения функции
            console.log(hello + ', ' + getName());
    }
    // В любой момент времени выполняется только один контекст функции (тело функции). 
    sayHello();
};

user();  //Hello, John Smith
