var express = require('express')
var app = express()
var path = require('path');

// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));
 
require('./routes/main.js')(app);


console.log('Up on port 5000')
app.listen(5000)