//set services and the characteristics that will be broadcasted using BLE
NRF.setServices({
  //this service will buzz the watch when the characteristic is written to
  "3e442221-f5bb-357d-719d-179272e4d4d9": {
    "3e443332-f5bb-357d-719d-179272e4d4d9": {
      value : [0],
      maxLen : 1,
      writable : true,
      onWrite : function(evt) {
        Bangle.buzz();
      }
    }
  },
  0xBCDE : { // a service
    0xABCD : { // a characteristic
      value : 0,
      readable : true,
      notify: true
    } // may add multiple characteristics to a single service
  }
}, { uart : false });
NRF.setAdvertising();
//may change the name that is being broadcasted but causes some issues
//(need to "forget" the bangle on every reconnect to upload code)
//NRF.setAdvertising({},"bangle-123")

// will flip between 0 and 1 on a swipe
var swipe_flip = 1; 

Bangle.on("swipe",function(direction){
  if (0==direction) {
    if(swipe_flip == 0){
      swipe_flip = 1;
    }else{
      swipe_flip = 0;
    }
    NRF.updateServices({
      0xBCDE : {
        0xABCD : {
          value : swipe_flip,
          readable : true,
          notify: true
        }
      }
    });
  }
});

