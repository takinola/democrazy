(function(){

  var React = require("react")
  ;

  var Header = React.createClass({
    render: function(){
      return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">DemoCrazy</a>
            </div>

            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Login</a></li>
                <li><a href="#">Register</a></li>
              </ul>
            </div>{/* .navbar-collapse */}
          </div>{/* .container-fluid */}
        </nav>
      );
    }
  });

  var Footer = React.createClass({
    render: function(){
      return (
        <nav className="navbar navbar-inverse footer">
          <div className="container-fluid">
            <p className="navbar-text navbar-left">&#169; StreamThing LLC 2015</p>
            <ul className="nav navbar-nav navbar-right">
              <li><p className="navbar-text">privacy</p></li>
              <li><p className="navbar-text">terms</p></li>
              <li><p className="navbar-text">contact</p></li>
            </ul>
          </div>
        </nav>
      );
    }
  });

module.exports.Header = Header;
module.exports.Footer = Footer;

})();