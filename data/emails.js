var config = require('../config').config();

module.exports = {
  email1: function(urlRef){
    return `
      ******************** SECURE TRANSMISSION ********************<br><br>

      Thank you for getting in contact, and congratulations in making it this far.
      <Br><br>
      I am the chief operations officer at a bespoke intelligence agency, our clients include some of the world's most powerful individuals and nation states.      
      <br><br>
      One of our agents has been working in deep cover in military intelligence, posted in Central London. She indicated that she had information of enourmous importance for us but, during planning for her extraction, she has disappeared.
      <br><br>
      We believe that she was being persued and so has severed all ties and gone to ground, as per her training. We do have some leads but need your help to track her down and recover the data she's taken before her former employers do.<br><br>
      <Br><Br>
      I need to explain to you the seriousness of our situation but, as ever, time is against us - more details will come later. Just know that, from what we do know, the future of the country is relying on us - and now, we are relying on you.
      <br><br>
      Yesterday, an encrypted mobile phone was delivered to one of our dormant safe houses.
      <br><br>
      Beneath the label on the package was this riddle and we believe the answer gives us four digits that will unlock the phone.
      <br><br>
      <strong>An open eye to follow the thread: At a few minutes to midnight, a damaged half-lion tells a story by the river.</strong>
      <br><br>
      If you can solve this puzzle, <a href="` + config.url + `ref=` + urlRef + `">click here</a> to enter the code in the 'order tracking' field. Please careful, our phones are programmed to wipe all data if an incorrect code is entered <strong>three times</strong>. Any more and both the data and the agent will be lost.
      <br><br>
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
  },
  nextStepEmail: function(nextStage, urlRef){
    switch (nextStage) {
      case 2:
        return `
          ******************** SECURE TRANSMISSION ********************<br><br>
          Fortunately, this answer was correct. As you have proven your loyalty, you have been entrusted with access to the next layer of our organisation.<br><br>

          Go to <a href="` + config.url + `">the NFS homepage</a> and, enter this email address at the bottom of the page, and click 'Join our mailing list'.<br><br>
          Your friends,<br>
          Neighbourhood Flower Shop
        `
        break;
    }
  }
}