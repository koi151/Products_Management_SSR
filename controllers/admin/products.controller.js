const Product = require('../../models/products.model');

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

// Filtering records of 'Products' table by 'criterias'
  const criterias = {
    deleted: false,
  } 

  const objectSearch = searchHelper(req.query);

  if (req.query.status)
    criterias.status = req.query.status;
  if (objectSearch.keyword) {
    criterias.title = objectSearch.regex;
  }  

// PAGINATION
  let initPaginationObject = {
    limitItems: 4,
    currentPage: 1,
    totalPage: null
  }
  const productsCount = await Product.countDocuments(criterias);
  const paginationObject = paginationHelper(initPaginationObject, req.query, productsCount); 
// END PAGINATION

// SORT
let sort = {};

if (req.query.sortKey && req.query.sortValue) {
  sort[req.query.sortKey] = req.query.sortValue;
} else {
  sort.position = 'desc';
}

// END SORT
  const products = await Product.find(criterias)
    .sort(sort)
    .limit(paginationObject.limitItems)
    .skip(paginationObject.skip);

  if (products.length > 0 || productsCount == 0) {
    res.render("admin/pages/products/products.pug", {
      pageTitle: 'Admin Product Page',
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: paginationObject
    })
  } else {
    let stringQuery = "";

    for (const key in req.query) {
      if (key != 'page') 
        stringQuery += `&${key}=${req.query[key]}`
    }
    res.redirect(`${req.baseUrl}?page=1${stringQuery}`);
  }
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  let id = req.params.id;
  let status = req.params.status;

  await Product.updateOne({ _id:  id}, { status: status});

  req.flash('success', 'Update status successful !');

  res.redirect('back');
}

// [PATCH] /admin/products/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch(type) {
    case "active":
    case "inactive":  
      await Product.updateMany({ _id: {$in: ids} }, { status: type });
      req.flash('success', `Update position for ${ids.length} products successful !`);
      break;

    case "delete-all":  
      await Product.updateMany({ _id: {$in: ids} }, { 
        deleted: true,
        deletedAt: Date()
      });
      req.flash('success', `Deleted ${ids.length} products.`);
      break;

    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split('-');
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash('success', `Update position for ${ids.length} products successful !`);
      break;
      
    default:
      break;
  } 

  res.redirect('back');
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Products.deleteOne({ _id: id }); // PERMANENTLY DELETE
  await Product.updateOne({ _id: id }, { 
    deleted: true,
    deletedAt: Date() 
  });
  req.flash('success', 'Product deleted.');
  res.redirect('back');
}

// [GET /admin/products/create]
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: 'Create new product'
  })
}

// [POST] /admin/products/createPost]
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  if (req.body.position === "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }

  const product = new Product(req.body);
  await product.save();

  req.flash('success', `Add new product successful.`);
  res.redirect(`/${systemConfig.adminPrefix}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    
    const product = await Product.findOne({
      _id: id,
      deleted: false
    })

    res.render("admin/pages/products/edit.pug", {
      pageTitle: 'Edit product',
      product: product
    });
  } catch (error) {
    req.flash('error', 'Page is not exists, directed to products page');
    res.redirect(`/${systemConfig.adminPrefix}/products`);
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file && req.file.filename) { // if image empty, get the old one
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }

  await Product.updateOne({ _id: id, }, req.body);

  req.flash('success', `Update product infomation successful.`);
  res.redirect(`back`);
}

// [GET /admin/products/detail/:id]
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
  
    const product = await Product.findOne({
      _id: id,
      deleted: false
    })

    res.render("admin/pages/products/detail.pug", {
      pageTitle: 'Product detail',
      product: product
    })
  } catch (error) {
    req.flash('error', 'Page is not exists, directed to products page');
    res.redirect(`/${systemConfig.adminPrefix}/products`);
  }
}