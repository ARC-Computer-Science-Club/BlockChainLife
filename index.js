var express  = require('express');
var fs = require('fs');
var app = express();

var options = {key: fs.readFileSync('key.pem'),
               cert: fs.readFileSync('certificate.pem')};

var server = require('https').createServer(options, app).listen(process.env.PORT || 3000);

var io = require('socket.io')(server);
var users = [];

app.use(express.static(__dirname));
app.use(express.static(require('path').join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('socket connected');
  socket.emit('saveSocketId', socket.id);

  socket.on('newUser', function(data) {
    if (data.id == null || data.name == "")
      return;
    for(var i in users)
    {
      console.log(users[i].id + " and " + data.id);
      if(users[i].id === data.id)
      {
        console.log("id already exists");
        return;
      }
    }
    users.push(data);
    console.log("user named " + data.name + " at " + data.position);
    io.sockets.emit('updateUsers', users);
    io.sockets.emit('updateDrivers', users);
  });

  socket.on('updatePosition', function(data) {
    var index = -1;
    for(var i = 0; i < users.length; i++)
      if(users[i].id == data.id)
        index = i;
    if(index != -1)
      users[index].position = data.position;
  });

  socket.on('disconnect', function() {
    var index = -1;
    for(var i = 0; i < users.length; i++)
      if(users[i].id == socket.id)
        index = i;
    
    if(index >= 0)
      users.splice(index, 1);

    io.sockets.emit('updateUsers', users);
  });
});

