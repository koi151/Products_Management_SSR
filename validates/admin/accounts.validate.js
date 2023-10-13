module.exports.createPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash('error', "Name field must not be empty");
    res.redirect('back');
    return;
  }

  if (!req.body.password) {
    req.flash('error', "Password field must not be empty");
    res.redirect('back');
    return;
  }

  if (req.body.password.length < 6) {
    req.flash('error', "Password must be at least 6 digits length");
    res.redirect('back');
    return;
  }
  next();
}