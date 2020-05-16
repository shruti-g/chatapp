
const socket=io()

socket.on('message',(message)=>{
    console.log(message)
});

document.querySelector("#message-form").addEventListener('submit',(e)=>{
  e.preventDefault();
  // var message=document.querySelector('input').value
  var message = e.target.elements.message.value
  socket.emit('SendMessage',message)
})
