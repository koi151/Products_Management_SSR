const Account = require('../../models/accounts.model');

const systemConfig = require("../../config/system")

module.exports.authRequire = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`/${systemConfig.adminPrefix}/auth/login`);
    return;
  }

  const account = await Account.findOne({
    token: req.cookies.token
  })

  if (!account) {
    if (req.cookies.token) res.clearCookie("token");
    res.redirect(`/${systemConfig.adminPrefix}/auth/login`);
    return;
  }

  next();
}