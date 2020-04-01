const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


// connect db
require("./db/connectDB");

// Passport Config
require('./config/passport')(passport);


// ejs
app.use(expressLayouts);
app.set("view engine", 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  

  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
// static files
app.use(express.static("./public"));

// routes
app.use("/", require("./routes/index"));
app.use("/account", require("./routes/account"));
app.use("/history", require("./routes/history"));
app.use("/balance", require("./routes/balance"));
app.use("/detail", require("./routes/detail"));



app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 4500


app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));
