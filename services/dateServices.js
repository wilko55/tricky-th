var moment = require('moment');

module.exports = {
  checkFeedbackDate: function(date){
    if ((date.day() === 2 || date.day() == 3 || date.day() == 5) && (date.hour() > 7 && date.hour() < 24)){
      return true

    }
    else return false
  }
}