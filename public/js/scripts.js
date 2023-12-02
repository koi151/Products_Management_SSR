// SHOW ALERT
const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
  const displayTime = parseInt(showAlert.getAttribute('alert-time')) || 3000;
  const closeAlert = document.querySelector('[close-alert]');

  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, displayTime)
  
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  })
}

// BACK TO PREVIOUS PAGE
const goBackButtons = document.querySelectorAll('[button-go-back]');
if (goBackButtons.length > 0) {
  goBackButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      history.back();
    })
  })
}