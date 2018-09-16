const express = require('express'), 
    app = express(), 
    http = require('http').Server(app), 
    io = require('socket.io')(http);

app.use(express.json());
app.post('/order-placed', (req, res) => {
    io.emit('order placed', req.body);
    res.send('ok');
});

io.on('connection', socket => {
    socket.on('order placed', order => socket.broadcast.emit(order));
});

http.listen(3000, () => console.log('listening on *:3000'));