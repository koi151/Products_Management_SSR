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
// END CLIENT SEND MESSAGE
