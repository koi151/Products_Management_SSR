const Product = require('../../models/products.model');

const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      deleted: false,
      status: "active",
      featured: "1"
    }).limit(6);

    const newFeaturedProducts = productsHelper.productsNewPrice(featuredProducts);

    const newProducts = await Product.find({
      deleted: false,
      status: "active", 
    }).sort({ position: "desc" }).limit(6);

    res.render("client/pages/home/index", {
      pageTitle: 'Home Page',
      featuredProducts: newFeaturedProducts,
      newProducts: newProducts
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occured, page is not exists");
    res.redirect('back');
  }
} 