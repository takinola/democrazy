(function(){

  var React = require("react")
  , DemoActions = require("../actions/DemoActions.js")
  , _ = require("underscore")
  , HotSpot = require("./HotSpot.jsx")
  ;

  var BigImageBox = React.createClass({
    handlePanelClick: function(){
      DemoActions.setStudioMode('edit');
    },

    renderFocusImage: function(){
      var slides = this.props.data.slides;
      var src = _.isUndefined(slides[this.props.data.focusImageKey]) ? null : slides[this.props.data.focusImageKey].src;
      var bigImage = src ? (<img id="previewImage" src={src} />) : null ;
      
      var hotSpotPosition = _.isUndefined(slides[this.props.data.focusImageKey]) ? null : slides[this.props.data.focusImageKey].hotspot;
      hotSpotPosition = _.isUndefined(hotSpotPosition) ? {top: undefined, bottom: undefined, right: undefined, left: undefined} : hotSpotPosition;

      var hotSpotImage = (
        <HotSpot position={hotSpotPosition} />
      );

      return (
        <div id="bigImage" onClick={this.handlePanelClick}>
          {bigImage}
          {/*hotSpotImage*/}
        </div>
      );
    },

    render: function(){
      return (
        this.renderFocusImage()
      );
    }
  });

  module.exports = BigImageBox;

})();