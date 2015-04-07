(function(){
    var React = require("react");
    var DemoActions = require("../actions/DemoActions.js");

    var DemoPreview = React.createClass({
        getInitialState: function(){
            return {
                currentSlide: 0
            }
        },

        handleClick: function(e){
            e.preventDefault();
            DemoActions.setAppMode("studio");
            this.state.currentSlide = 0;  // reset to the first slide when exiting
        },

        advanceSlide: function(e){
            e.preventDefault();
            this.state.currentSlide = (this.props.demo.slides.length > this.state.currentSlide + 1) ? this.state.currentSlide + 1 : this.state.currentSlide;
            this.setState(this.state);
        },

        renderPreview: function(){
            var src = this.props.demo.slides.length ? this.props.demo.slides[this.state.currentSlide].src : null;

            var preview = (
                <div id="previewBackground" className="outer-centering-div">
                    <div className="inner-centering-div">
                        <div className="previewImage">
                            <img src={src} id="previewImage" onClick={this.advanceSlide} />
                        </div>
                        <div className="previewCloseBtn">
                            <button className="btn btn-primary" onClick={this.handleClick}>Continue editing demo</button>
                        </div>
                    </div>
                    <div className="clear-both"></div>
                </div>
            );

            var render = this.props.demo.appMode === "preview" ? preview : null;

            return render;
        },

        render: function(){
            return (
                this.renderPreview()
            );
        }
    });
    
    module.exports = DemoPreview;

})();