const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    roomType: String,
    status: String,
    users: [
      {
        user_id: String,
        role: String
      } 
    ],
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  { timestamps: true }
)

const ChatRoom = mongoose.model("chatRoom", chatRoomSchema, "rooms-chat");

module.exports = ChatRoom;