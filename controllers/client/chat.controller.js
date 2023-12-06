const Chat = require('../../models/chat.model');
const Users = require('../../models/users.model');

const uploadToCloudinary = require('../../helpers/uploadToCloudinary');

// [GET] /chat/
module.exports.index = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // SocketIO
    _io.once('connection', (socket) => {
      socket.on('CLIENT_SEND_MESSAGE', async (data) => {

        console.log('data image:', data.images)
        let images = []
        if (data.images) {
          for (const imageBuffer of data.images) {
            const link = await uploadToCloudinary(imageBuffer);
            images.push(link);
          }
        }

        console.log('images db', images)
        // Save to database
        const chat = new Chat({
          user_id: userId,
          content: data.content,
          images: images
        })

        await chat.save();

        // Return data to client
        _io.emit('SERVER_RETURN_MESSAGE', {
          userId: userId,
          fullName: fullName,
          content: data.content,
          images: images
        })
      })

      // Return data to client while client typing
      socket.on('CLIENT_SEND_TYPING', (type) => {
        console.log('userId sending:', userId)
        socket.broadcast.emit('SERVER_RETURN_TYPING', {
          userId: userId,
          fullName: fullName,
          type: type
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