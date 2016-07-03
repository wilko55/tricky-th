var moment = require('moment');

module.exports = {
  checkFeedbackDate: function(date){
    if ((date.day() === 2 || date.day() == 3 || date.day() == 6) && (date.hour() > 7 && date.hour() < 19)){
      return true

    }
    else return false
  }
}