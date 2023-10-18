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
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
      slug: slugCategory,
      deleted: false,
      status: "active"
    })

    const getSubCategories = async (parentId) => {
      const subs = await ProductCategory.find({
        parent_id: parentId,
        deleted: false,
        status: 'active'
      })

      let allSub = [...subs];

      for (const sub of subs) {
        const childs = await getSubCategories(sub.id);
        allSub = allSub.concat(childs);
      }

      return allSub;
    }

    const subCategoriesList = await getSubCategories(category.id);  

    const subCategoriesIdList = subCategoriesList.map(item => item.id); 

    const products = await Product.find({
      product_category_id: { $in: [category.id, ...subCategoriesIdList] },
      deleted: false,
      status: "active"
    }).sort({ position: "desc" })

    const newProducts = productsHelper.productsNewPrice(products);

    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: newProducts
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    req.flash('error', 'Error occurred, directed to home page');
    res.redirect("back");
  }
}