const ProductCategories = require('../../models/products-category.model');
const Products = require('../../models/products.model');
const Accounts = require('../../models/accounts.model');
const Users = require('../../models/users.model');

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistics = {
    productCategories: {
      total: 0,
      active: 0,
      inactive: 0
    },
    products: {
      total: 0,
      active: 0,
      inactive: 0
    },
    adminAccounts: {
      total: 0,
      active: 0,
      inactive: 0
    },
    clientAccounts: {
      total: 0,
      active: 0,
      inactive: 0
    },
  }

  // Product categories
  statistics.productCategories.total = await ProductCategories.count({
    deleted: false
  });

  statistics.productCategories.active = await ProductCategories.count({
    status: 'active',
    deleted: false
  });

  statistics.productCategories.inactive = await ProductCategories.count({
    status: 'inactive',
    deleted: false
  });

  // Products
  statistics.products.total = await Products.count({
    deleted: false
  });

  statistics.products.active = await Products.count({
    status: 'active',
    deleted: false
  });

  statistics.products.inactive = await Products.count({
    status: 'inactive',
    deleted: false
  });

    // Admin accounts
    statistics.adminAccounts.total = await Accounts.count({
      deleted: false
    });
  
    statistics.adminAccounts.active = await Accounts.count({
      status: 'active',
      deleted: false
    });
  
    statistics.adminAccounts.inactive = await Accounts.count({
      status: 'inactive',
      deleted: false
    });

  // Users - client
  statistics.clientAccounts.total = await Users.count({
    deleted: false
  });

  statistics.clientAccounts.active = await Users.count({
    status: 'active',
    deleted: false
  });

  statistics.clientAccounts.inactive = await Users.count({
    status: 'inactive',
    deleted: false
  });


  res.render("admin/pages/dashboard/dashboard.pug", {
    pageTitle: 'DashBoard',
    statistics: statistics
  })
}