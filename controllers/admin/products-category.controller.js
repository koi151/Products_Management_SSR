const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper  = require("../../helpers/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const criterias = {
    deleted: false,
  };

  const records = await ProductCategory.find(criterias);
  const newRecords = createTreeHelper.tree(records);

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
  const newRecords = createTreeHelper.tree(records);

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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await ProductCategory.findOne({
      _id: id, 
      deleted: false
    });

    const records = await ProductCategory.find({
      deleted: false
    });
    
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/edit.pug', {
      pageTitle: "Edit product category",
      data: data,
      records: newRecords
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Can not load edit page");
    res.redirect("back")
  }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    if (req.file && req.file.filename) { 
      req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    await ProductCategory.updateOne({ _id: id }, req.body )
    
    req.flash('success', "Update product category successful !");
    res.redirect("back");

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, can not update product category")
    res.redirect("back");
  }
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({ _id: id });

    res.render("admin/pages/products-category/detail.pug", {
      pageTitle: "Product Category Detail",
      data: data
    })

  } catch(error) {
    console.log('ERROR OCCURED:', error);
    req.flash("error",  "Error occured, can not get data");
    res.redirect("back");
  } 
}

// [PATCH] /admin/products-category/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const newStatus = req.params.status;
    await ProductCategory.updateOne(
      { _id: id  }, 
      { status: newStatus}
    )

    req.flash('success', "Update status successful !");
    res.redirect('back');

  } catch (error) {
    console.log("Error occured while change status:", error);
    req.flash("error", "Error occured, can not change product category status");
    res.redirect("back");
  }
}

// [DELETE] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    
    await ProductCategory.updateOne({ _id: id }, { 
      deleted: true,
      deletedAt: Date() 
    });

    req.flash('success', 'Product deleted.');
    res.redirect('back');

  } catch (error) {
    console.log('Error occurred, delete failed:', error);
    req.flash('error', 'Error occured, can not delete product');
    res.redirect('back');
  }
}