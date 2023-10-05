const configSystem = require("../../config/system") 
const dashboardRouter = require('./dashboard.router');
const productsRouter = require('./products.router');

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;
  app.use(ADMIN_PATH + "/dashboard", dashboardRouter);
  app.use(ADMIN_PATH + "/products", productsRouter);
}
