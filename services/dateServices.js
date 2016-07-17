var moment = require('moment');

module.exports = {
  checkFeedbackDate: function(date){
    if ((date.day() === 1 || date.day() == 3 || date.day() == 4 || date.day() == 5) && (date.hour() > 8 && date.hour() < 22)){
      return true

    }
    else return false
  }
}