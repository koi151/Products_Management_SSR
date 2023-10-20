const Product = require("../../models/products.model");
const Cart = require("../../models/cart.model"); 
const Order = require("../../models/order.model"); 

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
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    let products = [];
    const cart = await Cart.findOne({
      _id: cartId
    })

    for (item of cart.products) {
      const productObject = {
        product_id: item.product_id,
        quantity: item.quantity,
        price: 0,
        discountPercentage: 0
      }
       
      const productInfo = await Product.findOne({
        _id: item.product_id
      })

      productObject.price = productInfo.price;
      productObject.discountPercentage = productInfo.discountPercentage;

      products.push(productObject);
    }
    
    const order = new Order({
      cart_id: cartId,
      userInfo: userInfo,
      products: products
    })
    await order.save();

    await Cart.updateOne(
      { _id: cartId },
      { products: [] }
    )

    res.redirect(`/checkout/success/${order.id}`)

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', "Error occcured, can not execute your order");
    res.redirect("back");
  }
}
