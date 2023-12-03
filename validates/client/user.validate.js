function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports.registerPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash('error', "Name must not be empty");
    res.redirect('back');
    return;
  }

  if (req.body.fullName.length < 5) {
    req.flash('error', "Full name must be at least 5 digit length");
    res.redirect('back');
    return;
  }

  if (!req.body.email) {
    req.flash('error', "Email must not be empty");
    res.redirect('back');
    return;
  }

  if (!isValidEmail(req.body.email)) {
    req.flash('error', "Invalid email format");
    res.redirect('back');
    return;
  }

  if (req.body.password.length < 6) {
    req.flash('error', "Password must be at least 6 digit length");
    res.redirect('back');
    return;
  }

  next();
};


module.exports.loginPost = async (req, res, next) => {
  if (!req.body.email) {
    req.flash('error', "Email must not be empty");
    res.redirect('back');
    return;
  }

  if (!isValidEmail(req.body.email)) {
    req.flash('error', "Invalid email format");
    res.redirect('back');
    return;
  }

  next();
};

module.exports.forgotPasswordPost = async (req, res, next) => {
  if (!req.body.email) {
    req.flash('error', "Email must not be empty");
    res.redirect('back');
    return;
  }

  if (!isValidEmail(req.body.email)) {
    req.flash('error', "Invalid email format");
    res.redirect('back');
    return;
  }

  next();
};
