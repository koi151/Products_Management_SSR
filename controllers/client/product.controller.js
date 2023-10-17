const Product = require('../../models/products.model');
const ProductCategory = require('../../models/products-category.model');

const productsHelper = require("../../helpers/products");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: 'active'
  }).sort({ position: 'desc' });

  const newProducts = productsHelper.productsNewPrice(products);

  res.render("client/pages/products/index", {
    pageTitle: 'Product Page',
    products: newProducts
  })
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ 
      slug: slug,
      deleted: false,
      status: 'active'
    })

    res.render("client/pages/products/detail", {
      pageTitle: 'Detail Page',
      product: product
    })
  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', 'Page is not exists, directed to home page');
    res.redirect("back");
  }
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    const productCategory = await ProductCategory({
      slug: req.params.slugCategory,
      deleted: false,
      status: "active"
    })

    console.log('id:', productCategory.id);
    const products = await Product.find({
      product_category_id: productCategory.id,
      deleted: false,
      status: "active"
    })

    console.log(products)

    res.send("TESTING OK");
    // res.render("client/pages/")

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', 'Page is not exists, directed to home page');
    res.redirect("back");
  }
}