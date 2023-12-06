const Users = require('../../models/users.model')

module.exports.notFriend = async (req, res) => {
  try {
    const currentUserId = res.locals.user.id;
    const users = await Users.find({
      _id: { $ne: currentUserId },
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