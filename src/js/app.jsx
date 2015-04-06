(function(){
    $ = jQuery = require("jquery");
    var bootstrap = require("bootstrap")
    ,   React = require("react")
    ,   DemoStore = require("./stores/DemoStore.js").DemoStore
    ,   DemoPreview = require("./components/DemoPreview.jsx")
    ,   DemoStudio = require("./components/DemoStudio.jsx")
    ;

    var DemoApp = React.createClass({
        mixins: [DemoStore.mixin],

        getInitialState: function(){
            return getDemo();
        },

        storeDidChange: function(){
            this.setState(getDemo());
        },

        render: function(){
            var style = {height: "100%"};

            return (
                <div style={style}>
                    <DemoStudio demo={this.state.demo} />
                    <DemoPreview demo={this.state.demo} />
                </div>
            );
        }
    });

    React.render(<DemoApp />, document.getElementById('demoApp'));

    function getDemo(){
        return {demo: DemoStore.getDemo()};
    }

})();