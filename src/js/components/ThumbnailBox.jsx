(function(){

  var React = require("react")
  , DemoActions = require("../actions/DemoActions.js")
  , ThumbnailList = require("./ThumbnailList.jsx")
  ;

  /***********************************************************
   ********************** Thumbnail Box **********************
   **********************************************************/

  var ThumbnailBox = React.createClass({
    handlePanelClick: function(){
      DemoActions.setStudioMode('edit');
    },

    render: function(){
      return (
        <div id="thumbnailBox" onClick={this.handlePanelClick} >
          <ThumbnailList data={this.props.data} />
        </div>
      );
    }
  });

  module.exports = ThumbnailBox;

})();