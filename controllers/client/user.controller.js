const Users = require('../../models/users.model')
const md5 = require("md5");

// [GET] /user/register
module.exports.register = async (req, res) => {
  try {
    res.render("client/pages/user/register", {
      pageTitle: 'Register Page'
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const emailExisted = await Users.findOne({
      email: req.body.email,
      deleted: false
    })

    if (emailExisted) {
      req.flash('error', 'Email existed, please choose another email');
      res.redirect("back");
      return;
    }

    req.body.password = md5(req.body.password);
    
    const newUser = new Users(req.body);
    await newUser.save();

    console.log(newUser);
    req.flash('success', "Account successfully created!");
    res.cookie('tokenUser', newUser.tokenUser);
    res.redirect('/');

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}

// [GET] /user/login
module.exports.login = async (req, res) => {
  try {
    res.render("client/pages/user/login", {
      pageTitle: 'Login Page'
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie('tokenUser');
  req.flash('success', 'Account logged out')
  res.redirect('/')
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email
    const password = md5(req.body.password)

    const user = await Users.findOne({
      email: email,
      deleted: false
    })

    if (!user) {
      req.flash('error', 'Email or password is not correct. Please try again');
      res.redirect("back");
      return;
    }

    if (password !== user.password) {
      req.flash('error', 'Email or password is not correct. Please try again');
      res.redirect("back");
      return;
    }

    if (user.status === 'inactive') {
      req.flash('error', 'User has been blocked');
      res.redirect("back");
      return;
    }

    res.cookie('tokenUser', user.tokenUser);
    req.flash('success', 'Login successful !')
    res.redirect('/')

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}