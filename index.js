const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

require("dotenv").config();

const database = require('./config/database');
database.connect();

const routeClient = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const systemPrefix = require("./config/system")

const app = express();
const port = process.env.PORT;
const flash = require('express-flash');

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static("public"));

// override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Flash
app.use(cookieParser('KWJFKWEIFHW'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// Variables
app.locals.adminPrefix = systemPrefix.adminPrefix;

// Routes
routeClient(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})