var WebSocket = require('ws');
var ws = new WebSocket('ws://cloud.neurosteer.com:8080/v1/features/0006664e5c15/pull', {
  protocolVersion: 8,
  origin: 'http://websocket.org'
});

ws.on('open', function open() {
  console.log('connected');
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('error', function close() {
  console.log('socket error');
  //todo reconnect
});

ws.on('message', function message(data, flags) {
  var record = eval( "(" + data + ")" ); // convert to JSON
  console.log(  record.features.c1 );
});
