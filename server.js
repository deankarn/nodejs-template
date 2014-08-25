
// Setup required tools and variables

var express       = require('express');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var mongoose 	    = require('mongoose');
var passport 	    = require('passport');
var flash    	    = require('connect-flash'); // may get rid of if we go 100% websocket
var formidable 	  = require('formidable');
var connectAssets = require('connect-assets');
var fs            = require('fs');

var app           = express();
var port          = process.env.PORT || 8081;
var configDB      = require(__dirname + '/app/config/database.js');

// Configure and setup tools and their settings

mongoose.connect(configDB.url); // connect to our database

require(__dirname + '/app/config/passport')(passport); // pass passport for configuration
 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'iSwearByMyPrettyFloralBonnetIwillendyou!',
    proxy: true,
    //rolling: true,
    unset: 'destroy',
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      secure: false, // needs set to true when https
      //maxAge: null // use with single page app websockets, that I'm going to test
      maxAge: 60 * 60 * 1000 // use with http requests, or the way I'm going to
    },
    store: new MongoStore({
      collection: 'sessions', // table/collection name for sessions default is sessions
      auto_reconnect: true,
      url: configDB.url + '/sessions',
      clear_interval: 60 * 60 * 1000 // disabled, gets cleaned up 
    })
  }));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(connectAssets({
    paths:[
        'static/js',
        'static/css'
    ],
    servePath: 'static/bundled',
    buildDir: 'static/bundled',
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.basedir = app.get('views');

app.enable('trust proxy');

// Setup Development vs Production settings
if (process.env.NODE_ENV == 'production')
{
  app.enable('view cache');
}
else
{
  var logger = require('morgan');

  app.use(logger('dev')); // log every request to the console
  app.disable('view cache');
}

// Load all routes in the /app/routes/ directory

//require(__dirname + '/app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passpor
fs.readdir(__dirname + '/app/routes', function (err, files){
  files.forEach(function (fn) {
    if(!/\.js$/.test(fn)) return;
      require(__dirname + '/app/routes/' + fn)(app, passport);
  });
});

// Launch the application
app.listen(port);
console.log('running on port ' + port);
