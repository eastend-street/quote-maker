var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require('dotenv').config();

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const MongoClient = require("mongodb").MongoClient;
const uri =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/api", (req, res) => {
  client.connect(err => {
    const db = client.db(process.env.DB_DATABASE_NAME);
    db.collection("quotes")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        res.send(result);
      });
  });
});

app.post("/api", (req, res) => {
  client.connect(err => {
    const db = client.db(process.env.DB_DATABASE_NAME);
    const data = {
      quote: req.body.quote,
      author: req.body.author,
      canvas_url: req.body.canvas_url,
      categories: req.body.categories
    };
    db.collection("quotes").insertOne(data, (err, result) => {
      console.log("Inserted one document into the collection");
      console.log(err);
      client.close();
      res.send(err);
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
