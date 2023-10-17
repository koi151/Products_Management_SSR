const Account = require('../../models/accounts.model')
const md5 = require("md5");

const systemConfig = require("../../config/system");

// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  try {
    res.render("admin/pages/my-account.pug", {
      pageTitle: 'My Account'
    });
  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occured, page is not exists");
    res.redirect('back');
  }
}

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  try {
    res.render("admin/pages/my-account/edit", {
      pageTitle: 'Edit Account'
    });
  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occured, page is not exists");
    res.redirect('back');
  }
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    if (req.file && req.file.filename) { 
      req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    await Account.updateOne({ _id: res.locals.user.id }, req.body)

    req.flash("success", "Account information has been updated successfully !");
    res.redirect('back')

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occured, can not update account information");
    res.redirect('back');
  }
}