var name = "Cat";

function showName() {
    console.log('First Name: ' + name);
    // var name = 'Ford';
    console.log('Last Name: ' + name);
}
showName(); 

// First Name: undefined
// Last Name: Ford

/* Объявление переменной name поднимается вверх без присваивания, перекрывая глобальную переменную, поэтому в первом случае значение переменной name - undefined */
