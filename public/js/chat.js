// CLIENT SEND MESSAGE
const formDataSend = document.querySelector(".chat .inner-form");
formDataSend.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = e.target.elements.content.value;
  
  if (content) {
    socket.emit('CLIENT_SEND_MESSAGE', content);
    e.target.elements.content.value = "";
  }
})

// SERVER RETURN MESSAGE
socket.on('SERVER_RETURN_MESSAGE', (data) => {
  const myId = document.querySelector('[my-id]').getAttribute('my-id');
  const chatBody = document.querySelector('.chat .inner-body');
  const newDiv = document.createElement("div")

  let fullNameDisplay = ''
  if (data.userId == myId) {
    newDiv.classList.add('inner-outgoing');
  } else {
    newDiv.classList.add('inner-incoming');
    fullNameDisplay = `<div class='inner-name'>${data.fullName}</div>`
  }
  
  newDiv.innerHTML = `
    ${fullNameDisplay}
    <div class='inner-content'>${data.content}</div>
  `
  chatBody.appendChild(newDiv);
})




