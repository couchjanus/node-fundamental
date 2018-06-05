var assert = require('assert');

function pow(x, n) {
    /* код функции, пока что пусто */
    return 8; // :) мы - мошенники!
}

describe("pow", function() {
    it("возводит в n-ю степень", function() {
      assert.equal(pow(2, 3), 8);
    });
});


// function pow(x, n) {
//     var result = 1;
  
//     for (var i = 0; i < n; i++) {
//       result *= x;
//     }
  
//     return result;
// }
  
// describe("pow", function() {

//     it("при возведении 2 в 3ю степень результат 8", function() {
//       assert.equal(pow(2, 3), 8);
//     });
  
//     it("при возведении 3 в 4ю степень равен 81", function() {
//       assert.equal(pow(3, 4), 81);
//     });
  
//   });
  

// Чтобы быть уверенными, что функция работает верно, желательно протестировать её на большем количестве значений. мы можем сгенерировать тесты в цикле for:

//   describe("pow", function() {
  
//     function makeTest(x) {
//       var expected = x * x * x;
//       it("при возведении " + x + " в степень 3 результат: " + expected, function() {
//         assert.equal(pow(x, 3), expected);
//       });
//     }
  
//     for (var x = 1; x <= 5; x++) {
//       makeTest(x);
//     }
  
//   });
