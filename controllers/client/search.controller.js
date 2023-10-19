const Product = require("../../models/products.model");

const ProductsHelper = require("../../helpers/products"); 

module.exports.index = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    let newProducts = [];

    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
    
      const products = await Product.find({
        title: keywordRegex,
        deleted: false, 
        status: "active"
      })

      newProducts = ProductsHelper.productsNewPrice(products);
    }

    res.render("client/pages/search/index.pug", {
      pageTitle: 'Search Result',
      keyword: keyword,
      products: newProducts
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    res.redirect("back");
  }
}