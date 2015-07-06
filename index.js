var socket;
var WebSocket = require('websocket-client').WebSocket;

var reconnectInterval = 1000 * 60;
var connect = function () {
    var count = 0;

    socket = new WebSocket( "ws://cloud.neurosteer.com:8080/v1/features/0006664e5c15/pull" );
    socket.onmessage = function ( event ) {
        record = eval( "(" + event.data + ")" ); // convert to JSON
        console.log(  record.features );
    };
    socket.onopen = function ( event ) {
        var ta = document.getElementById( 'responseText' );
        console.log(   "Web Socket opened!" );
    };
    socket.onerror = function () {
        console.log( 'socket error' );
        setTimeout( connect, reconnectInterval );
    };
    socket.onclose = function ( event ) {
        console.log( 'socket close' );
        var ta = document.getElementById( 'responseText' );
        console.log(  "Web Socket closed, reconnect in " + reconnectInterval + " msec" );
        setTimeout( connect, reconnectInterval );
    };
};
connect();
