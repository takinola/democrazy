(function(){

  var React = require('react')
  , PublishBox = require("./PublishBox.jsx")
  , BigImageBox = require("./BigImageBox.jsx")
  , ThumbnailBox = require("./ThumbnailBox.jsx")
  , Header = require("./HeaderAndFooter.jsx").Header
  , Footer = require("./HeaderAndFooter.jsx").Footer
  ;


  var DemoStudio = React.createClass({
    renderStudio: function(){
      var style = {height: "100%"};
      var studio = (
         <div style={style}>
          {<Header />}
          <div id="demoStudio" className="container-fluid">
            {<PublishBox data={this.props.demo} />}
            {<BigImageBox data={this.props.demo} />}
            {<ThumbnailBox data={this.props.demo} />}
          </div>
          {<Footer />}
        </div>           
      );

      var render = this.props.demo.appMode === "studio" ? studio : null;
      return render;
    },

    render: function(){
      return (
        this.renderStudio()
      );
    }
  });

  module.exports = DemoStudio;

})();