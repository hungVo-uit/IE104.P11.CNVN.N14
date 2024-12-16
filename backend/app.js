const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routers/index");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const app = express();
const initializePassport = require("./config/passport.config");
const session = require("express-session");
require("dotenv/config");

//conect database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "Lapshop",
  })
  .then((e) => console.log("Connect to mongodb success"))
  .catch((e) => console.log(e));
//middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: "Lapshop",
      collectionName: "session",
      ttl: 60 * 60 * 24 * 14,
      autoRemove: "native",
    }),
  })
);
//config passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const __dirNameList = __dirname.split("\\");
const __rootDir = __dirNameList.slice(0, -1).join("\\");
const __viewsDir = __rootDir + "\\frontend\\views";
const __publicDir = __rootDir + "\\frontend\\public";
app.use(express.static(__publicDir));
console.log(__publicDir);
//set view engine
app.set("views", __viewsDir);
app.set("view engine", "ejs");
//set route
route(app);
app.listen(+process.env.PORT, () => {
  console.log("server running on 3000");
});
