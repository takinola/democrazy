(function(){
  var React = require("react")
  , _ = require("underscore")
  ;

  var HotSpot = React.createClass({
    renderHotSpot: function(){
      var previewImage = document.getElementById("previewImage"); // get the preview image
      
      // stop processing if preview image does not exist
      if(!previewImage){
        return null;
      }

      var previewImagePosition = previewImage.getBoundingClientRect();  // get location of previewImage

      // initialize the relative position of the hotspot
      var positionRelative = {};  // will contain position of hotspot proportional to the position of the previewImage
      positionRelative.top = _.isUndefined(this.props.position.top) ? 0 : this.props.position.top;
      positionRelative.right = _.isUndefined(this.props.position.right) ? 100 : this.props.position.right;
      positionRelative.left = _.isUndefined(this.props.position.left) ? 0 : this.props.position.left;
      positionRelative.bottom = _.isUndefined(this.props.position.bottom) ? 100 : this.props.position.bottom;

      // calculate the relative position, height and width of the hotspot based on preview image dimensions
      var positionAbsolute = {};  // will contain actual position of the hotspot relative to viewport
      positionAbsolute.top = Math.round(previewImagePosition.top + (previewImagePosition.bottom - previewImagePosition.top) * positionRelative.top / 100);
      positionAbsolute.height = Math.round((positionRelative.bottom - positionRelative.top) / 100 * (previewImagePosition.bottom - previewImagePosition.top));
      positionAbsolute.left = Math.round(previewImagePosition.left + (previewImagePosition.right - previewImagePosition.left) * positionRelative.left / 100);
      positionAbsolute.width = Math.round((positionRelative.right - positionRelative.left) / 100 * (previewImagePosition.right - previewImagePosition.left));

      var style = positionAbsolute;
      style.position = "fixed";
      style.zIndex = 5;
      style.borderColor = "red";
      style.borderStyle = "solid";

      var hotspot = (
        <div id="hotspot" style={style}></div>
      );

      return hotspot;
    },

    render: function(){
      return (
        this.renderHotSpot()
      );
    }
  });

  module.exports = HotSpot;

})();