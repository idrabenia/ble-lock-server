var util = require('util');
var Lock = require('./lock');
var lock = new Lock();

var bleno = require('bleno');
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

function LockCharacteristic() {
  LockCharacteristic.super_.call(this, {
    uuid: 'b5254de2097711e6b5123e1d05defe78',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'open door lock'
      })
    ]
  });
}

util.inherits(LockCharacteristic, BlenoCharacteristic);

LockCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('onWriteRequest'); 
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  } else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  } else {
    var needUnlock = data.readUInt8(0);
    needUnlock && lock.unlock();
    
    console.error("Received characteristic: " + needUnlock);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = LockCharacteristic;
