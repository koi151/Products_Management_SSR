const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper  = require("../../helpers/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const criterias = {
    deleted: false,
  };

  const records = await ProductCategory.find(criterias);
  const newRecords = createTreeHelper(records);

  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Products Category",
    records: newRecords
  })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const criterias = {
    deleted: false,
  };

  const records = await ProductCategory.find(criterias);
  const newRecords = createTreeHelper(records);

  res.render('admin/pages/products-category/create.pug', {
    pageTitle: "Create product category",
    records: newRecords
  })

}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position === "") {
      const productCategoryCount = await ProductCategory.countDocuments();
      req.body.position = productCategoryCount + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    req.flash('success', 'Create new category successful!');
    res.redirect(`/${systemConfig.adminPrefix}/products-category`);

  } catch (error) {
    console.log('CANNOT CREATE NEW CATEGORY - ERROR:', error);
    req.flash('error', 'Create new category failed, error occured!');
    res.redirect("back");
  }
}