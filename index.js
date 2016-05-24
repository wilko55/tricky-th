var express = require('express')
var app = express()
var path = require('path');
app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));
 
require('./routes/main.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});