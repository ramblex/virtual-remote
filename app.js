var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var sensitivity = 5; // Mouse sensitivity

io.on('connection', function(socket){
    socket.on('mouse', function(ev) {
      exec('xdotool mousemove_relative -- ' + (ev.x * sensitivity) + ' ' + (ev.y * sensitivity));
    });

    socket.on('click', function() {
      exec('xdotool click 1');
    });

    socket.on('scroll', function(direction) {
      if (direction == "up") {
        exec('xdotool click 4');
      } else {
        exec('xdotool click 5');
      }
    });

    socket.on('volume', function(direction) {
      exec('amixer -c 0 sset Master 5%'+direction);
    })

    socket.on('shortcut', function(shortcut) {
      if (shortcut == "iplayer") {
        exec('xdotool search "BBC iPlayer" windowactivate', function(error) {
          if (error != null && error.code == 1) {
            exec('firefox -new-window http://bbc.co.uk/iplayer');
          }
        });
      } else if (shortcut == "netflix") {
        exec('xdotool search "Netflix" windowactivate', function(error) {
          if (error != null && error.code == 1) {
            exec('google-chrome http://netflix.com');
          }
        });
      }
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
