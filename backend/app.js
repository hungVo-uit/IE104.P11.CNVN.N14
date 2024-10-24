const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.json());

const __dirNameList = __dirname.split("\\");
const __rootDir = __dirNameList.slice(0, -1).join("\\");
const __viewsDir = __rootDir + "\\frontend\\views";
const __publicDir = __rootDir + "\\frontend\\public";

app.use(express.static(__publicDir));

app.set("views", __viewsDir);
app.set("view engine", "ejs");

console.log(__publicDir);
app.listen(3000, () => {
  console.log("server running on 3000");
});
