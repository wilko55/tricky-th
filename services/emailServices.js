var config = require('../config').config();

var api_key = config.mailgun.apiKey;
var domain = 'neighbourhoodflowershop.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = {
  sendEmail: function(to, subject, body){ 
    var data = {
      from: 'Neighbourhood Flower Shop <test@neighbourhoodflowershop.com>',
      to: to,
      subject: subject,
      html: body
    };
     
    mailgun.messages().send(data, function (error, body) {
      if (error){
        console.log('Error', error);
      }
      console.log(body);
    });
  }
}