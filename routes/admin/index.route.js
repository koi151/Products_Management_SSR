const configSystem = require("../../config/system") 

const dashboardRouter = require('./dashboard.router');
const productsRouter = require('./products.router');
const productsCategoryRouter = require('./products-category.router');
const rolesRouter = require('./roles.router');
const accountsRouter = require('./accounts.router');
const authRouter = require('./auth.router');

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(ADMIN_PATH + "/dashboard", dashboardRouter);

  app.use(ADMIN_PATH + "/products", productsRouter);

  app.use(ADMIN_PATH + "/products-category", productsCategoryRouter);

  app.use(ADMIN_PATH + "/roles", rolesRouter);

  app.use(ADMIN_PATH + "/accounts", accountsRouter);

  app.use(ADMIN_PATH + "/auth", authRouter);
}
