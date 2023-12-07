const Users = require('../../models/users.model');

module.exports = async(req, res) => {
  try {
    const currentUserId = res.locals.user.id;

    _io.once('connection', (socket) => {
      socket.on('USER_ADD_FRIEND', async (otherUserId) => {
        const friendExisted = await Users.findOne({
          _id: otherUserId,
          acceptFriends: currentUserId
        })

        if (!friendExisted) {
          // Add acceptFriend data to other user
          await Users.updateOne({
            _id: otherUserId
          }, {
            $push: { acceptFriends: currentUserId }
          })
        }

        const userExisted = await Users.findOne({
          _id: otherUserId,
          requestFriendsL: currentUserId
        })

        if (!userExisted) {
          // Add requestFriend feild to current user
          await Users.updateOne({
            _id: currentUserId
          }, {
            $push: { requestFriends: otherUserId }
          })
        }
      })


      socket.on('USER_CANCEL_FRIEND', async (otherUserId) => {
        const friendExisted = await Users.findOne({
          _id: otherUserId,
          acceptFriends: currentUserId
        })

        if (friendExisted) {
          // Remove acceptFriend feild to other user
          await Users.updateOne({
            _id: otherUserId
          }, {
            $pull: { acceptFriends: currentUserId }
          });
        }

        const userExisted = await Users.findOne({
          _id: otherUserId
        })
          // Remove requestFriend field to current user
        if (userExisted) {
          await Users.updateOne({
            _id: currentUserId
          }, {
            $pull: { requestFriends: otherUserId }
          })
        }
      })
    })

  } catch (error) {
    console.log('Error occurred in Users Socket:', error);
    req.flash('error', "Error occured, can not add friend")
  }
} 