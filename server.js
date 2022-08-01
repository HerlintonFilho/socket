const express = require('express');
const { Socket } = require('socket.io');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use('/', (req, res)=>{
    res.render('index')
})

let messages = [

];

io.on('connection', socket =>{
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', messages)
    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data)
    })
    
})

server.listen(3000);