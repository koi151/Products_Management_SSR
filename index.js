const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const moment = require("moment");
const cookieParser = require('cookie-parser');
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");

require("dotenv").config();

const database = require('./config/database');
database.connect();

const routeClient = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const systemPrefix = require("./config/system")

const app = express();
const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;

// override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Flash
app.use(cookieParser('KWJFKWEIFHW'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// TinyMCE
app.use(
  '/tinymce',
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// Variables
app.locals.adminPrefix = systemPrefix.adminPrefix;
app.locals.moment = moment;

// Routes
routeClient(app);
adminRoute(app);

app.get('*', (req, res) => {
  res.render('client/pages/errors/404', {
    pageTitle: '404 Not Found'
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
})