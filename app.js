var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { Liquid } = require("liquidjs");
var engine = new Liquid();

const { isInstalled, isAuth } = require("./middlewares");

var indexRouter = require("./routes/index");
const setupRouter = require("./routes/setup");
const authRouter = require("./routes/auth");
const settingsRouter = require("./routes/settings");
const websitesRouter = require("./routes/websites");
const shellRouter = require("./routes/shell");
const syncRouter = require("./routes/sync");
const serversRouter = require("./routes/servers");

var app = express();

// register liquid engine
app.engine("liquid", engine.express());
app.set("views", "./views"); // specify the views directory
app.set("view engine", "liquid"); // set liquid to default

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/setup", isInstalled, setupRouter);

app.use(isInstalled, (req, res, next) => {
  next();
});

app.use("/api/sync", syncRouter);

app.use("/api/auth", authRouter);

app.use(isAuth, (req, res, next) => {
  next();
});

app.use("/api", indexRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/websites", websitesRouter);
app.use("/api/shell", shellRouter);
app.use("/api/servers", serversRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error", { message: err.message, error_status: err.status });
  res.send(err.message);
});

module.exports = app;
