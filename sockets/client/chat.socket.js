const Chat = require('../../models/chat.model');

const uploadToCloudinary = require('../../helpers/uploadToCloudinary');

module.exports = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  const chatRoomId = req.params.chatRoomId;

  _io.once('connection', (socket) => {
    socket.join(chatRoomId);

    socket.on('CLIENT_SEND_MESSAGE', async (data) => {

      let images = []
      if (data.images) {
        for (const imageBuffer of data.images) {
          const link = await uploadToCloudinary(imageBuffer);
          images.push(link);
        }
      }

      // Save to database
      const chat = new Chat({
        user_id: userId,
        room_chat_id: chatRoomId,
        content: data.content,
        images: images
      })

      await chat.save();

      // Return data to client
      _io.to(chatRoomId).emit('SERVER_RETURN_MESSAGE', {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images
      })
    })

    // Return data to client while client typing
    socket.on('CLIENT_SEND_TYPING', (type) => {
      socket.broadcast.to(chatRoomId).emit('SERVER_RETURN_TYPING', {
        userId: userId,
        fullName: fullName,
        type: type
      })
    })
  })
}