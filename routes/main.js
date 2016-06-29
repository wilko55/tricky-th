var flash = require('connect-flash');
var moment = require('moment');
var dateServices = require('../services/dateServices.js')

module.exports = function(app) {
  app.get('/', function(req,res, next) {
    res.render('home', { messages: req.flash('info'), error: req.flash('error') })
  })

  app.post('/feedback', function(req, res, next) {
    var keyWord = 'jakob';

    if (req.body.feedbackBody.toLowerCase().indexOf(keyWord)!=-1 && dateServices.checkFeedbackDate(moment()) == true){
      // save something in database with their email
      res.render('com1', {email: req.body.email})
    }
    else {
      req.flash('info', 'Thanks for your feedback!')
      res.redirect('/');
    }
  })

  app.post('/tracking', function(req, res, next) {
    if (req.body.trackingNumber !== '123'){
      req.flash('error', 'Tracking number not found')
      res.redirect('/');
    }
    else {
      res.send('This page is coming soon...')
    }
  })
}
