const express = require('express');
const app = express();
const port = 3000;

// Приложение выдает ответ “Hello from Express!” на запросы, адресованные корневому URL (/) или маршруту.
app.get('/', (request, response) => {

    response.send('Hello from Express!');

});

// Приложение запускает сервер и слушает соединения на порте 3000. 

app.listen(port, (err) => {
   if (err) {
     // Для всех остальных путей ответом будет something bad happened.
     return console.log('something bad happened', err);
   }
    console.log(`server is listening on ${port}`);
 });
