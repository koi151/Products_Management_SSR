import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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
  chatBody.scrollTop = chatBody.scrollHeight;
})

// Scroll to newest chat
const chatBody = document.querySelector('.chat .inner-body');
if (chatBody) {
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Imoji picker
const buttonIcon = document.querySelector('.button-icon');
console.log('buttonIcon', buttonIcon)
if (buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  console.log('tooltip', tooltip)
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode; 
    console.log(icon)
    const inputChat = document.querySelector('.chat .inner-form input[name="content"]')
    inputChat.value = inputChat.value + icon;
    console.log('inputChat', inputChat)
  });
}

  // .addEventListener('emoji-click', event => console.log(event.detail));
