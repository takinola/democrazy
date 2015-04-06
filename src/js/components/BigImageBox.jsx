(function(){

  var React = require("react");
  var DemoActions = require("../actions/DemoActions.js");
  var _ = require("underscore");

  var BigImageBox = React.createClass({
    handlePanelClick: function(){
      DemoActions.setStudioMode('edit');
    },

    renderFocusImage: function(){
      var slides = this.props.data.slides;
      var src = _.isUndefined(slides[this.props.data.focusImageKey]) ? null : slides[this.props.data.focusImageKey].src;
      var bigImage = src ? (<img src={src} />) : null ;
      return (
        <div id="bigImage" onClick={this.handlePanelClick}>
          {bigImage}
        </div>
      );
    },

    render: function(){
      return this.renderFocusImage();
    }
  });

  module.exports = BigImageBox;

})();