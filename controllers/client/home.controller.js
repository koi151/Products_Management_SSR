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

    res.render("client/pages/home/index", {
      pageTitle: 'Home Page',
      featuredProducts: newFeaturedProducts,
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash("error", "Error occured, page is not exists");
    res.redirect('back');
  }
} 