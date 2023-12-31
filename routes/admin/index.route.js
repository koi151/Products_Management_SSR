const configSystem = require("../../config/system") 

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRouter = require('./dashboard.router');
const productsRouter = require('./products.router');
const productsCategoryRouter = require('./products-category.router');
const rolesRouter = require('./roles.router');
const accountsRouter = require('./accounts.router');
const myAccountRouter = require('./my-account');
const authRouter = require('./auth.router');
const settingRouter = require("./setting.route")

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/dashboard",
    authMiddleware.authRequire, 
    dashboardRouter
  );

  app.use(
    ADMIN_PATH + "/products", 
    authMiddleware.authRequire,
    productsRouter
  );

  app.use(
    ADMIN_PATH + "/products-category",
    authMiddleware.authRequire,
    productsCategoryRouter
  );

  app.use(
    ADMIN_PATH + "/roles", 
    authMiddleware.authRequire,
    rolesRouter
  );

  app.use(
    ADMIN_PATH + "/accounts",
    authMiddleware.authRequire, 
    accountsRouter
  );

  app.use(
    ADMIN_PATH + "/my-account",
    authMiddleware.authRequire, 
    myAccountRouter
  );

  app.use(
    ADMIN_PATH + "/auth", 
    authMiddleware.authRequire, 
    authRouter
  );

  app.use(
    ADMIN_PATH + "/settings", 
    authMiddleware.authRequire, 
    settingRouter
  );

}
