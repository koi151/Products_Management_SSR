const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")
const searchRoutes = require("./search.route")
const cartRoutes = require("./cart.route")
const checkoutRoutes = require("./checkout.route")
const userRoutes = require("./user.route")
const chatRoutes = require("./chat.route")

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {  
  app.use(categoryMiddleware.category);

  app.use(cartMiddleware.cartId);

  app.use(userMiddleware.userInfo);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", searchRoutes);

  app.use("/cart", cartRoutes);

  app.use("/checkout", checkoutRoutes);
  
  app.use("/user", userRoutes);
  
  app.use("/chat", chatRoutes);

}