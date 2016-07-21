var flash = require('connect-flash');
var moment = require('moment');
var dateServices = require('../services/dateServices.js')
var emailServices = require('../services/emailServices.js')
var models = require('../data/models/index');
var Base64 = require('js-base64').Base64;
var config = require('../config').config();

var emails = require('../data/emails');

module.exports = function(app) {
  app.get('/', function(req,res, next) {
    // emailServices.testEmail();
    res.render('home', { messages: req.flash('info'), error: req.flash('error') })
  })

  app.get('/ref=:email', function(req,res, next) {
    var email = req.params.email;
      res.render('home', { messages: req.flash('info'), error: req.flash('error'), email: email })
  })

  app.post('/feedback', function(req, res, next) {
    var keyWord = 'jakob';

    if (req.body.feedbackBody.toLowerCase().indexOf(keyWord)!=-1 && dateServices.checkFeedbackDate(moment()) == true){
      // save something in database with their email
      models.User.find({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if (user != null){
          req.flash('info', 'Thanks for your feedback, please check your inbox!')
          res.redirect('/');
        }
        else {
          models.User.create({'email': req.body.email, 'currentStage': 1}).then(function () {
            emailServices.sendEmail(req.body.email, 'Thanks for your feedback' , emails.email1(Base64.encodeURI(req.body.email)))
            res.render('com1', {email: req.body.email})
          });
        }
      });
      
    }
    else {
      req.flash('info', 'Thanks for your feedback!')
      res.redirect('/');
    }
  })

  app.post('/tracking', function(req, res, next) {
    // makes sure there's an email to check the db for
    if (typeof req.body.hiddenEmail == 'undefined'){
      req.flash('error', 'Tracking number not found')
      res.redirect('/');
    }
    var realEmail = Base64.decode(req.body.hiddenEmail)
    models.User.find({
      where: {
        email: realEmail
      }
    }).then(function(user) {
      if (user){
        // if user is found in db
        var currentStage = user.currentStage
        models.Stage.find({
          where: {
            stage: currentStage
          }
        }).then(function(stage){
          // if correct answer
          var answers = stage.answer.split('|')
          var guess = req.body.trackingNumber.toLowerCase().replace(/\s/g, '');
          var isCorrect = false;
          if (answers.indexOf(guess) != -1){
            isCorrect = true
          }

          if (user.chances < stage.chances && isCorrect === true){
            req.flash('info', 'Thanks for your assistance, we will be in touch')
            // send email for next clue
            var nextStage = user.currentStage + 1
            user.updateAttributes({chances: 0, currentStage: nextStage})
            .then(function(){
              emailServices.sendEmail(user.email, 'Thanks for your feedback' , emails.nextStepEmail(nextStage))
              res.redirect('/');
            })
          }
          else if (user.chances < stage.chances && isCorrect === false){
            console.log('in here, correct:', isCorrect)
            // got another chance but answer incorrect
            user.increment('chances')
            .then(function(){
              req.flash('error', 'Tracking number incorrect')
              res.redirect('/ref=' + req.body.hiddenEmail);
            })
          }
          else if (user.chances == stage.chances){
            // out of chances
            user.updateAttributes({exitStage: currentStage})
            .then(function(){
              if (user.rejectionSent == 0){
                user.updateAttributes({rejectionSent: 1})
                .then(function(){
                  emailServices.sendEmail(user.email, 'Thanks for your feedback' , emails.rejection(currentStage))
                })
              }
              req.flash('error', 'Tracking number not found')
              res.redirect('/');
            })
          }
          else{
            req.flash('error', 'Tracking number not found')
            res.redirect('/');
          }  
        })
      }
      else {
        req.flash('error', 'Tracking number not found')
        res.redirect('/');
      }  
    })
  })

  app.post('/mailinglist', function(req, res, next) {
    models.User.find({
      where: {
        email: req.body.emailMailingList
      }
    }).then(function(user) {
      if (!!user){
        if (user.currentStage > 1 && user.rejectionSent == 0){
        res.render('seccom-' + user.currentStage, {url: config.url, urlRef: Base64.encodeURI(user.email)})
        }
        else {
          req.flash('info', 'Thanks for signing up!')
          res.redirect('/');
        }
      }
      else {
          req.flash('info', 'Thanks for signing up!')
          res.redirect('/');
        }
    })
  });
}
