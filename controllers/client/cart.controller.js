const Cart = require("../../models/cart.model");
const Product = require("../../models/products.model");

const ProductsHelper = require("../../helpers/products");

// [GET] /client/cart
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

    res.render("client/pages/cart/index.pug", {
      pageTitle: 'Cart Page',
      cartDetail: cart
    });

  } catch(error) {
    console.log("ERROR OCCURRED:", error)
    req.flash("error", "Error occurred, redirect to previous page");
    req.redirect("back")
  }
}

// [GET] /client/cart
module.exports.deleteItem = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne({
      _id: cartId
    }, {
      "$pull": {
        products: { "product_id": productId }
      }
    })

    req.flash('Product has been deleted from cart')
    res.redirect('back');

  } catch(error) {
    console.log("ERROR OCCURRED:", error)
    req.flash("error", "Error occurred, redirect to previous page");
    req.redirect("back")
  }
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

// [GET] /client/cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const newQuantity = parseInt(req.params.quantity);

    await Cart.updateOne(
      { 
        _id: cartId,
        'products.product_id':  productId
      },
      {
        'products.$.quantity': newQuantity 
      }
    )

    req.flash("success", "Quantity updated !");
    res.redirect("back");

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occurred, can not update product quantity");
    res.redirect("back");
  }
}
