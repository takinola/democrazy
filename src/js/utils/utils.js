(function(){
  var _ = require("underscore")
  ;

  /* applies changes to state
   * used so there is no need to repeat all the previous state values when trying to change just
   * one property
   */
  function changeState(state, changes){
    _.forEach(changes, function(change, key){
      state[key] = change;
    });

    return state;
  }

  module.exports.changeState = changeState;
})();