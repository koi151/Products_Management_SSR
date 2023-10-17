const ProductCategory = require("../../models/products-category.model");

const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
  try {
    const productCategories = await ProductCategory.find({ deleted: false });
    const newProductCategories = createTreeHelper.tree(productCategories);

    res.locals.layoutCategoryProducts = newProductCategories;
    next();

  } catch (error) {
    console.log("Error occurred in category middleware:", error);
    req.flash("error", "Error occurred, redirect back");
    res.redirect("back");
  }
}