const mongoose = require('mongoose')
const generate = require('../helpers/generateString');

const usersSchema = new mongoose.Schema(
{
  fullName: String, 
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.generateRandomString(30)
  },
  phone: String,
  avatar: String,
  friendList: [
    {
      user_id: String,
      room_chat_id: String,
    }
  ],
  acceptFriends: Array,
  requestFriends: Array,
  status: {
    type: String,
    default: 'active'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},
{ timestamps: true })

const Users = mongoose.model("Users", usersSchema, 'users');

module.exports = Users;