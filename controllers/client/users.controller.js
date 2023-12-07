const Users = require('../../models/users.model')

const usersSocket = require('../../sockets/client/users.socket');

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  try {
    const currentUserId = res.locals.user.id;

    usersSocket(req, res); // SockerIO
    
    const currentUser = await Users.findOne({
      _id: currentUserId
    })

    const acceptFriendList = currentUser.acceptFriends;
    const requestFriendList = currentUser.requestFriends; 

    const users = await Users.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: acceptFriendList } },
        { _id: { $nin: requestFriendList } },
      ],
      status: 'active',
      deleted: false
    }).select('avatar fullName')

    res.render("client/pages/users/not-friend", {
      pageTitle: 'User List',
      users: users
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', 'Page is not exists, directed to home page');
    res.redirect("back");
  }
}