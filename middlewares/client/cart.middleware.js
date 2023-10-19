const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {

  if (!req.cookies.cartId) {
    const cart = new Cart();
    const expiresTime = 1000 * 60 * 60 * 24 * 365;

    await cart.save();
    res.cookie('cartId', cart.id, { 
      expires: new Date(Date.now() + expiresTime)
    })
  }

  next();
}