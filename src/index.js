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
io.on('connection',()=>{
  console.log("new socket connection");
})

server.listen(port,()=>{
  console.log(`server is up and running on ${port}`);
});