
module.exports.index = async (req, res) => {
  try {
    res.render('client/pages/rooms-chat/index', {
      pageTitle: 'Chat Rooms'
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Error occurred, redirect to previous page');
    res.redirect('back')
  }
}