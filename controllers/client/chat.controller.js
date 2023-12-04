
// [GET] /chat/
module.exports.index = async (req, res) => {
  try {
    // SocketIO
    _io.on('connection', (socket) => {
      console.log('a user connected', socket.id);
    })
    // End SocketIO

    res.render('client/pages/chat/index.pug', {
      pageTitle: 'Chat Page'
    })

  } catch (error) {
    console.log('Error occurred:', error);
    req.flash('error', 'Page is not exists, redirected to previous page');
    res.redirect("back");
  }
}