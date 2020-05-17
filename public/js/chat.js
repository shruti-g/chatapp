
const socket=io()

socket.on('message',(message)=>{
    console.log(message)
});

document.querySelector("#message-form").addEventListener('submit',(e)=>{
  e.preventDefault();
  var message = e.target.elements.message.value
  socket.emit('SendMessage',message,(error)=>{
    if (error)
    {
      console.log(error);
    }
    else {
      console.log("message dilivered!");
    }
    // console.log(message);
  })
})
document.querySelector('#send-location').addEventListener('click',()=>{
  if(!navigator.geolocation)
  {
    return alert("the browser do not support this feature")
  }
  navigator.geolocation.getCurrentPosition((position)=>{
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
    socket.emit('shareLocation',{
      latitude:latitude,
      longitude:longitude
    },(message)=>{
      console.log(message);
    });

  })
})
