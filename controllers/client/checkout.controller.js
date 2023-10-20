const Product = require("../../models/products.model");
const Cart = require("../../models/cart.model"); 

const ProductsHelper = require("../../helpers/products");

// [GET] /client/checkout
module.exports.index = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    })

    let cartTotalPrice = 0;

    if (cart.products.length > 0) {
      for (const item of cart.products) {

        const productInfo = await Product.findOne({
          _id: item.product_id
        })

        productInfo.newPrice = ProductsHelper.productNewPrice(productInfo);

        item.productInfo = productInfo;
        item.totalPrice = item.quantity * productInfo.newPrice;
        cartTotalPrice += item.totalPrice
      }
    }

    cart.totalPrice = cartTotalPrice;

    res.render("client/pages/checkout/index.pug", {
      pageTitle: 'Cart Page',
      cartDetail: cart
    });

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occurred, redirect to previous page");
    res.redirect("back")
  }
}

// [POST] /client/checkout/order
module.exports.orderPost = async (req, res) => {
  try {

    res.send("TESTING OK");

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', "Error occcured, can not execute your order");
    res.redirect("back");
  }
}
