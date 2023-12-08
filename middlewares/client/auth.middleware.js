const Users = require('../../models/accounts.model');

module.exports.authRequire = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
    return;
  }

  const user = await Users.findOne({
    token: req.cookies.token
  })

  if (!user) {
    if (req.cookies.tokenUser) 
      res.clearCookie("tokenUser");
    res.redirect(`/user/login`);
    return;
  }

  next();
}