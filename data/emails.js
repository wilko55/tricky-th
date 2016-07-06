var config = require('../config').config();

module.exports = {
  email1: function(urlRef){
    return `
      ******************** SECURE TRANSMISSION ********************<br><br>

      Thank you, we appreciate your sympathy for our cause.<br><br>

      I need to explain to you the seriousness of our situation but, as ever, time is against us - that will have to come later. Just know that the future of this country relies on us - and now we are relying on you.<br><br>

      One of our senior agents has gone missing. We believe that she was being persued and so has severed all ties and gone to ground, as per her training. We do have some leads but need your help to track them down before the other side does.<br><br>

      A mobile phone was delivered to one of our dormant safe houses.<br><br>

      Beneath the label on the package was this riddle and we believe the answer gives us four digits that will unlock the phone.<br><br>
      
      <strong>An open eye to follow the thread: At a few minutes to midnight, a damaged half-lion tells a story by the river.</strong><br><br>

      If you can solve this riddle, <a href="` + config.url + `ref=` + urlRef + `">click here</a> to enter the code. Be careful, our phones are programmed to wipe all data if an incorrect code is entered <strong>three times</strong>. Any more and both the data and the agent will be lost.<br><br>

      Good luck, we are depending on you,<br>
      Neighbourhood Flower Shop
    `
  },
  rejection: function(currentStage){
    switch (currentStage) {
      case 1:
        return `
          ******************** SECURE TRANSMISSION ********************<br><br>
          I am deeply sorry we placed such faith in you. We have lost all data on the phone and have just received word - from one of our reliable resources - that our agent has been found by the other side.<br><br>
          You will never hear from us again. Do not attempt to communicate with us as we will disavow all knowledge of you.
        `
        break;
    }
  }
}