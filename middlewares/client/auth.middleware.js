const Users = require('../../models/users.model');

module.exports.authRequire = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
    return;
  }

  const user = await Users.findOne({
    _id: res.locals.user.id,
    tokenUser: req.cookies.tokenUser,
    deleted: false
  })

  if (!user) {
    if (req.cookies.tokenUser) 
      res.clearCookie("tokenUser");
    res.redirect(`/user/login`);
    return;
  }

  next();
}