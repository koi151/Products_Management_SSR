const Chat = require('../../models/chat.model');
const Users = require('../../models/users.model');

// [GET] /chat/
module.exports.index = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // SocketIO
    _io.once('connection', (socket) => {
      socket.on('CLIENT_SEND_MESSAGE', async (content) => {
        const chat = new Chat({
          user_id: userId,
          content: content
        })

        await chat.save();

        // // Return data to client
        _io.emit('SERVER_RETURN_MESSAGE', {
          userId: userId,
          fullName: fullName,
          content: content
        })
      })
    })
    // End SocketIO

    const chats = await Chat.find({
      deleted: false
    });

    for (const chat of chats) {
      const userInfo = await Users.findOne({
        _id: chat.user_id
      }).select('fullName')

      chat.userInfo = userInfo;
    }

    res.render('client/pages/chat/index.pug', {
      pageTitle: 'Chat Page',
      chats: chats
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}