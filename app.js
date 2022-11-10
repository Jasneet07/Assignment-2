let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let expbs = require("express-handlebars");

let session = require("express-session");
let flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);

require("./models/db");

let app = express();

const hbs = expbs.create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    list: function (config, data, block) {
      let tr = "";
      for (let i = 0; i < data.length; i++) {
        let td = "";
        for (let j = 0; j < config.length; j++) {
              if (config[j].type === "delete"){
                  td+= '<td><button id="delete">Delete</button></td>'
                  continue
              }
          td += "<td>" + data[i][config[j].accessor] + "</td>";
        }
        tr += "<tr>" + td + "</tr>";
      }
      return tr;
    },
  },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/employer", require("./routes/employer"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
