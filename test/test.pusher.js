// First, run `npm install pusher`

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '362793',
  key: 'ad03c94863f3c47d59c2',
  secret: '9a4002d8be367be5f8e4',
  cluster: 'eu'
});


pusher.trigger('my-channel', 'my-event', {"message": "hello world"});