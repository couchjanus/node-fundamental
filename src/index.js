import server from './bin';
const app = server();

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`Server started at http://${app.get('host')}:${app.get('port')}`);
});
