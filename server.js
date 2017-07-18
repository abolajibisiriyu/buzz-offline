const fs = require('fs');

const express = require('express');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

var buzz;

io.on('connection', function(socket) {

    fs.readFile('generated.json', 'utf-8', function(err, data) {
        if (err) throw err;
        buzz = JSON.parse(data);
        // console.log('Total Buzz', buzz.length);
        socket.emit('message', buzz.splice(0, 25));
    });

    setInterval(function() {
        var index = Math.floor(Math.random() * 100) % (buzz.length - 1);
        socket.emit('message', buzz[index]);
        // console.log('Buzz at :', index, 'sent');
    }, 2000);

});


server.listen(9999, function() {
    console.log('App running at http://localhost:9999');
});