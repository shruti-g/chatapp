const express=require("express");
const  path=require('path');
const http=require('http');
const socketio= require('socket.io');
const Filter=require('bad-words');

const app=express();

const server=http.createServer(app);
const io=socketio(server)

const port=process.env.PORT || 3000;

const publicDirectoryPath=path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection',(socket)=>{
  console.log("new socket connection");

  socket.emit('message',"welcome!")

  socket.broadcast.emit('message',"a new user has joined !")

  socket.on('SendMessage',(message,callback)=>{

    const filter=new Filter();
    if(filter.isProfane(message))
    {
        callback('error occured cannot send such messages')
    }
    else {
      io.emit('message',message);
      // callback('message is deliverd to client');
      callback()
    }

  })

  socket.on('disconnect',()=>{
    io.emit('message',"a new user has disconnected")
  })

  socket.on('shareLocation',(coords,callback)=>{
    io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    callback('shared locaiton')
  })
})

server.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
});
