(function(){
    var React = require("react");
    var DemoActions = require("../actions/DemoActions.js");

    var PublishBox = React.createClass({
        handleButtonClick: function(e){
            e.preventDefault();
            DemoActions.setAppMode('preview');
        },

        handlePanelClick: function(){
            DemoActions.setStudioMode('publish');
        },

        handleFormChange: function(){

        },

        render: function(){
            var style = this.props.data.studioMode === "publish" ? {height: "420px"} : {height: "70px"};

            return (
                <div id="publishBox" style={style} onClick={this.handlePanelClick}>
                    <form>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="form-group">
                                    <input type="text" className="form-control input-lg" placeholder="Demo title" name="demoTitle" ref="demoTitle" value={this.props.data.demoTitle} onChange={this.handleFormChange} />
                                </div>
                            </div>

                            <div className="col-md-2">
                                <button className="btn btn-default pull-right" ref="previewButton" onClick={this.handleButtonClick}>Preview demo</button>
                            </div>

                            <div className="col-md-3">
                                <input type="text" className="form-control input-lg" placeholder="Search saved demos" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="demoDescription">Description</label>
                                    <textarea className="form-control" rows="4" name="demoDescription" value={this.props.data.demoDescription} onChange={this.handleFormChange} placeholder="Enter detailed description of the demo" ref="demoDescription" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="demoLanguage">Language</label>
                                    <select className="form-control" name="demoLanguage" ref="demoLanguage" value={this.props.data.demoLanguage} onChange={this.handleFormChange}>
                                        <option value="english">English</option>
                                        <option value="french">French</option>
                                        <option value="german">German</option>
                                        <option value="spanish">Spanish</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3 col-md-offset-1">
                                <div className="form-group">
                                    <label htmlFor="demoRegion">Region</label>
                                    <select className="form-control" name="demoRegion" ref="demoRegion" value={this.props.data.demoRegion} onChange={this.handleFormChange}>
                                        <option value="all">All</option>
                                        <option value="na">NA</option>
                                        <option value="sa">SA</option>
                                        <option value="emea">EMEA</option>
                                        <option value="apj">APJ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="demoType">Demo Type</label>
                                    <select className="form-control" name="demoType" ref="demoType" value={this.props.data.demoType} onChange={this.handleFormChange}>
                                        <option value="sales">Sales</option>
                                        <option value="training">Training</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <button className="btn btn-success" ref="publishButton" onClick={this.handleButtonClick}>Publish demo</button>
                            </div>
                        </div>

                    </form>
                </div>
            );
        }
    });

    module.exports = PublishBox;

})();