var bleno = require('bleno');
var LockCharacteristic = require('./lock-characteristic');
var BlenoPrimaryService = bleno.PrimaryService;

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('lock', ['20458ad6097511e6b5123e1d05defe78']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  
  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: '0000ec00-0000-1000-8000-00805f9b34fb',
        characteristics: [
          new LockCharacteristic()
        ]
      })
    ]);
  }
});

