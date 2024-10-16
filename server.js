const express = require("express");
const database = require("./config/database.js");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const routerAdmin = require("./routes/admin/index.route.js");
const router = require("./routes/client/index.route");
const systemConfig = require("./config/system.js");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const moment = require("moment");
database.connect();

//Tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(cookieParser("abcabcabc"));
app.use(
  cookieSession({
    name: "session",
    keys: ["your-secret-key1", "your-secret-key2"], // Thêm các khóa ký cookie ở đây
    cookie: {
      maxAge: 60000, // Cookie sẽ tồn tại trong 60 giây
    },
  })
);
app.use(flash());

//method overide
app.use(methodOverride("_method"));

//body-parse
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`); //thêm dirname vì khi deploy server sẽ k hiểu duoc.
app.set("view engine", "pug");

routerAdmin(app);
router(app);

//Khai baos bien toan cuc
app.locals.prefixAdmin = systemConfig.prefixAdmin; //chi dung duoc trong file pug

app.use(express.static(`${__dirname}/public`)); ////thêm dirname vì khi deploy server sẽ k hiểu duoc.

//Tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

//moment
app.locals.moment = moment;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
