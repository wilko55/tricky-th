var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser('thisIsMySecret!'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));
 
require('./routes/main.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});