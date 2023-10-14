const Account = require('../../models/accounts.model');
const md5 = require('md5');

const systemConfig = require('../../config/system');

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  try {
    res.render("admin/pages/auth/login.pug", {
      pageTitle: "Authencation"
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  try {
    const enteredEmail = req.body.email;
    const enteredPassword = md5(req.body.password);

    const user = await Account.findOne({
      email: enteredEmail   
    })

    if (!user) {
      req.flash("error", "Account does not exists");
      res.redirect("back");
      return;
    }

    if (enteredPassword != user.password) {
      req.flash("error", "Wrong password, please try again !");
      res.redirect("back");
      return;
    }

    if (user.status == 'inactive') {
      req.flash("error", "Can not login, account has been blocked");
      res.redirect("back");
      return;
    }

    res.cookie("token", user.token);
    req.flash("success", "Login successful !");
    res.redirect(`/${systemConfig.adminPrefix}/dashboard`);    

  } catch (error) {
    console.log("ERROR OCCURED: ", error);
    req.flash("error", "Error occured, can not login");
    res.redirect("back");
  }
}