const socket=io()

//elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton=document.querySelector('#send-location')
const $messages=document.querySelector('#messages')//messages div


//Templates
const messageTemplate=document.querySelector("#message-template").innerHTML
const locationTemplate=document.querySelector('#location-template').innerHTML

socket.on('message',(message)=>{
    console.log(message)

    const html=Mustache.render(messageTemplate,{
      message:message
    })
    $messages.insertAdjacentHTML('beforeend',html)


});

socket.on('locationMessage',(locationMessage)=>{
  console.log(locationMessage);
  const html=Mustache.render(locationTemplate,{
    locationMessage:locationMessage
  })
  $messages.insertAdjacentHTML('beforeend',html);
})
$messageForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  //disable send button $messageFormButton
  $messageFormButton.setAttribute('disabled','disabled');

  var message = e.target.elements.message.value
  socket.emit('SendMessage',message,(error)=>{
    //enable
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.focus();
    $messageFormInput.value=''

    if (error)
    {
      console.log(error);
    }
    else {
      console.log("message dilivered!");
    }
  })
})
$sendLocationButton.addEventListener('click',()=>{
  if(!navigator.geolocation)
  {
    return alert("the browser do not support this feature")
  }
  //disable location button
  $sendLocationButton.setAttribute('disabled','disabled');

  navigator.geolocation.getCurrentPosition((position)=>{
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
    socket.emit('shareLocation',{
      latitude:latitude,
      longitude:longitude
    },(message)=>{
      //enable
      $sendLocationButton.removeAttribute('disabled');
      console.log(message);
    });

  })
})
