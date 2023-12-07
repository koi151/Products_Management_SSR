/* Handle event add friend */
const listAddFriendBtn = document.querySelectorAll('[btn-add-friend]');
if (listAddFriendBtn.length > 0) {
  listAddFriendBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.box-user').classList.toggle('add');

      const userId = btn.getAttribute('btn-add-friend');
      socket.emit('USER_ADD_FRIEND', userId);
    })
  })
}

/* End handle event add friend */
