const Cart = require("../../models/cart.model");
const Product = require("../../models/products.model");

const systemConfig = require("../../config/system");

// [GET] /client/cart
module.exports.index = async (req, res) => {
  res.send("OK");
}

// [POST] /client/cart/create/:id
module.exports.addPost = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;
    const quantityAdd = parseInt(req.body.quantity);

    const cart = await Cart.findOne({ 
      _id: cartId
    });

    // Check if product existed in cart
    const productExisted = cart.products.find(product => product.product_id == productId);

    if (productExisted) {
      console.log('updated quantity');
      const newQuantity = productExisted.quantity + quantityAdd;
      
      await Cart.updateOne(
        { 
          _id: cartId,
          'products.product_id': productId
        },
        {
          'products.$.quantity': newQuantity
        }
      )
    } else {

      const cartObject = {
        product_id: productId,
        quantity: req.body.quantity
      }

      await Cart.updateOne(
        { 
          _id: cartId 
        },
        {
          $push: { products: cartObject }
        }
      )
    }
    
    req.flash("success", `Product has been added to cart !`);
    res.redirect("back");

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", `Error occurred, can not add products to cart`);
    res.redirect("back");
  }
}