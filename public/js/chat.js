import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

// File upload with image
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image', {
  multiple: true,
  maxFileCount: 6
});

// CLIENT SEND MESSAGE
const formDataSend = document.querySelector(".chat .inner-form");
if (formDataSend) {
  formDataSend.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const images = upload.cachedFileArray || [];
    
    if (content || images.length > 0) {
      // send images
      socket.emit('CLIENT_SEND_MESSAGE', {
        content: content,
        images: images
      });

      e.target.elements.content.value = "";
      upload.resetPreviewPanel();

      // hide the typing effect
      socket.emit('CLIENT_SEND_MESSAGE', 'hidden');
    }
  })
}

// SERVER RETURN MESSAGE
socket.on('SERVER_RETURN_MESSAGE', (data) => {
  const myId = document.querySelector('[my-id]').getAttribute('my-id');
  const chatBody = document.querySelector('.chat .inner-body');
  const boxTyping = document.querySelector('inner-list-typing');
  const newDiv = document.createElement("div")

  let fullNameDisplay = '';
  let contentDisplay = '';
  let imagesDisplay = '';

  if (data.userId == myId) {
    newDiv.classList.add('inner-outgoing');
  } else {
    newDiv.classList.add('inner-incoming');
    fullNameDisplay = `<div class='inner-name'>${data.fullName}</div>`
  }

  if (data.content) {
    contentDisplay = `<div class='inner-content'>${data.content}</div>`
  }

  if (data.images) {
    imagesDisplay += `<div class="inner-images">`;

    for (const image of data.images) {
      imagesDisplay += `
        <img src="${image}">
      `;
    }

    imagesDisplay += `</div>`;
  }
  
  newDiv.innerHTML = `
    ${fullNameDisplay}
    ${contentDisplay}
    ${imagesDisplay}
  `
  chatBody.insertBefore(newDiv, boxTyping);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Preview Image
  const boxImages = newDiv.querySelector('.inner-images');
  if (boxImages) {
    const gallery = new Viewer(boxImages);
  }
})

// Scroll Chat to bottom
const chatBody = document.querySelector('.chat .inner-body');
if (chatBody) {
  chatBody.scrollTop = chatBody.scrollHeight;
}
// Show Typing
var timeOut;
const showTyping = () => {
  socket.emit('CLIENT_SEND_TYPING', 'show');

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit('CLIENT_SEND_TYPING', 'hidden');
  }, 3000)
}

// Imoji picker
const buttonIcon = document.querySelector('.button-icon');
if (buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
  const inputChat = document.querySelector('.chat .inner-form input[name="content"]')

  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode; 
    inputChat.value = inputChat.value + icon; 

    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus()

    showTyping();
  });

  // CLIENT SEND TYPING
  if (inputChat) {
    inputChat.addEventListener("keyup", () => {
      showTyping();
    })
  }
}

// SERVER RETURN TYPING
const typingListElements = document.querySelector('.chat .inner-list-typing');
if (typingListElements) {
  socket.on('SERVER_RETURN_TYPING', (data) => {
    if (data.type == 'show') {
      const existedTyping = typingListElements.querySelector(`[user-id="${data.userId}"]`);

      if (!existedTyping) {
        const boxTyping = document.createElement('div');
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);

        boxTyping.innerHTML = `
          <div class='inner-name'>${data.fullName}</div>
          <div class='inner-dots'>
            <span></span>
            <span></span> 
            <span></span> 
          </div>
        `
        typingListElements.appendChild(boxTyping);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    } else {
      const boxTypingRemove = typingListElements.querySelector(`[user-id="${data.userId}"]`);
      if (boxTypingRemove) {
        typingListElements.removeChild(boxTypingRemove);
      }
    }
  })
}
// END SERVER RETURN TYPING

// Preview image
if (chatBody) {
  const gallery = new Viewer(chatBody)
}