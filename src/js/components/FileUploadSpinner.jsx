(function(){

  var React = require("react");

  var FileUploadSpinner = React.createClass({
    renderSpinner: function(){
      var style = {width: "100%"};
      return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" style={style}>
            Uploading files.  Please wait...
          </div>
        </div>
      );
    },

    render: function(){
      var spinner = this.props.display ? this.renderSpinner() : null;
      return spinner;

    }
  });

  module.exports = FileUploadSpinner;

})();