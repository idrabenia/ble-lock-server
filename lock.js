var gpio = require('rpi-gpio');

function noop () { }

function Lock () {
  var self = this;
  var timeoutId; 
  var state;

  function init () {
    gpio.setup(7, gpio.DIR_OUT, turnOnLock);
  }

  self.unlock = function () {
    timeoutId && clearTimeout(timeoutId); 

    gpio.write(7, true);
    timeoutId = setTimeout(turnOnLock, 1000);
  };

  function turnOnLock () {
    gpio.write(7, false);
  }

  init ();
}

module.exports = Lock;
