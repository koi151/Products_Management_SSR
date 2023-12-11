const Users = require('../../models/users.model');
const ChatRoom = require('../../models/rooms-chat.model');

// [GET] /rooms-chat/
module.exports.index = async (req, res) => {
  try {
    res.render('client/pages/rooms-chat/index', {
      pageTitle: 'Chat Rooms'
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Error occurred, redirect to previous page');
    res.redirect('back')
  }
}

// [GET] /rooms-chat/create/
module.exports.create = async (req, res) => {
  try {
    const friendList = res.locals.user.friendList;

    for(const friend of friendList) {
      const friendInfo = await Users.findOne({
        _id: friend.user_id,
        deleted: false
      }).select('fullName avatar')

      friend.friendInfo = friendInfo;
    }

    res.render('client/pages/rooms-chat/create', {
      pageTitle: 'Create Chat Room',
      friendList: friendList,
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Error occurred, redirect to previous page');
    res.redirect('back')
  }
}

// [POST] /rooms-chat/create/
module.exports.createPost = async (req, res) => {
  try {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const roomData = {
      title: title,
      roomType: 'group',
      users: []
    }

    usersId.forEach(userId => {
      roomData.users.push({
        user_id: userId,
        role: 'user'
      });
    })

    roomData.users.push({
      user_id: res.locals.user.id,
      role: 'superAdmin'
    });

    const room = new ChatRoom(roomData);
    await room.save();

    res.redirect(`/chat/${room.id}`);

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Error occurred, redirect to previous page');
    res.redirect('back')
  }
}