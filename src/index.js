const express=require("express");
const  path=require('path');//no need to install as it is global package
const http=require('http');
const socketio= require('socket.io');

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

  socket.on('SendMessage',(notification)=>{
    io.emit('message',notification);
  })

  socket.on('disconnect',()=>{
    io.emit('message',"a new user has disconnected")
  })

  socket.on('shareLocation',(coords)=>{
    io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)

  })
})

server.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
});
