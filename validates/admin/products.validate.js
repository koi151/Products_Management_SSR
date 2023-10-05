module.exports.createPost = async (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', "Title must not be empty");
    res.redirect('back');
    return;
  }

  if (req.body.title.length < 5) {
    req.flash('error', "Title must be at least 5 digits length");
    res.redirect('back');
    return;
  }

  console.log('validate run');
  next();
}