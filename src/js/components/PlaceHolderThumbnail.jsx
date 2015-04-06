(function(){

  var React = require("react")
  ;

  var PlaceHolderThumbnail = React.createClass({
    renderPlaceHolder: function(){
      return (
        <div className="thumbnailPlaceholder">
          <span>Drop files here</span>
        </div>
      );
    },

    render: function(){
      var placeholder = this.props.display ? this.renderPlaceHolder() : null;
      return (placeholder);
    }
  });

  module.exports = PlaceHolderThumbnail;

})();