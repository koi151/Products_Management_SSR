const Chat = require('../../models/chat.model');
const Users = require('../../models/users.model');

const uploadToCloudinary = require('../../helpers/uploadToCloudinary');
const chatSocket = require('../../sockets/client/chat.socket')

// [GET] /chat/
module.exports.index = async (req, res) => {
  try {
    // SocketIO
    chatSocket(res);
    
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