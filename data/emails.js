var config = require('../config').config();

module.exports = {
  email1: function(urlRef){
    return `
      ******************** SECURE TRANSMISSION ********************br><br>

      Thank you, we appreciate your sympathy for our cause.<br><br>

      An agent of ours has gone missing, I believe the other side are aware of their whereabouts and so they have gone dark. We do have some leads but need your help to piece together the events leading to their disappearence and, hopefully, track them down before the others do.<br><br>

      Another of our agents picked up a parcel from a dead drop that has been dormant for several years / A mobile phone was delivered to one of our safe houses that had been dormant for several years.<br><br>

      Beneath the label on the package was this riddle and we believe the answer gives us four digits that will unlock the phone.<br><br>
      
      <strong>An open eye to follow the thread: A cold, damaged half-lion rests by a river telling a story. At a few minutes to midnight, he gives up a year</strong><br><br>

      When you have solved the riddle, click <a href="` + config.url + `ref=` + urlRef + `">here</a> to enter the code. Be careful we can only make one mistake - any more and both the data and the agent will be lost for good.
    `
  },
  rejection: function(currentStage){
    switch (currentStage) {
      case 1:
        return `
          ******************** SECURE TRANSMISSION ********************<br><br>
          I am deeply sorry we placed such faith in you. We have just received word - from one of our reliable resources - that the agent has been discovered.<br><br>
          You will never hear from us again. Do not attempt to communicate with us as we will disavow all knowledge of you.
        `
        break;
    }
  }
}