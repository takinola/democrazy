(function(){
    var Flux = require("../stores/DemoStore.js").Flux;

    var DemoActions = Flux.createActions({
        addSlide: function(slide){
            return {
                actionType: "ADD_SLIDE",
                slide: slide
            }
        },

        setThumbnailFocus: function(key){
            return {
                actionType: "SET_THUMBNAIL_FOCUS",
                key: key
            }
        },

        setAppMode: function(mode){
            return {
                actionType: "SET_APP_MODE",
                mode: mode
            }
        },

        setStudioMode: function(mode){
            return {
                actionType: "SET_STUDIO_MODE",
                mode: mode
            }
        },

        deleteSlide: function(slide_index){
            return {
                actionType: "DELETE_SLIDE",
                index: slide_index
            }
        }
    });

    module.exports = DemoActions;
})();