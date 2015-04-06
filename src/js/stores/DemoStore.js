(function(){
    var Dispatcher = require("../dispatcher/Dispatcher.js");
    
    // set up dispatcher
    var Flux = new Dispatcher();

    // set up store

    var demoData = {};  // will contain the definition of the current demo
    demoData.slides = [];  // will contain the information about each slide
    demoData.appMode = "studio";  // start the app in "studio" mode
    demoData.studioMode = "edit";  // start the studio in "edit" mode
    demoData.focusImageKey = 0;  // start focus on first image in thumbnailList

    /* FAKE DATA */
    /*
    demoData.demoTitle = "fake demo";
    demoData.demoDescription = "fake description";
    demoData.demoRegion = "na";
    demoData.demoLanguage = "french";
    demoData.demoType = "sales";
    */

    var DemoStore = Flux.createStore({
        getDemo: function(){
          return demoData;
        }
    }, function(payload){
        switch(payload.actionType){
            case "ADD_SLIDE":
                addSlide(payload.slide);
                DemoStore.emitChange();
                break;

            case "SET_THUMBNAIL_FOCUS":
                demoData.focusImageKey = payload.key;
                DemoStore.emitChange();
                break;

            case "SET_APP_MODE":
                demoData.appMode = payload.mode;
                DemoStore.emitChange();
                break;

            case "SET_STUDIO_MODE":
                demoData.studioMode = payload.mode;
                DemoStore.emitChange();
                break;

            case "DELETE_SLIDE":
                var pre = demoData.slides.slice(0, payload.index);
                var post = demoData.slides.slice(payload.index + 1, demoData.slides.length);
                demoData.slides = pre.concat(post);

                // adjust focus if needed
                demoData.focusImageKey = findFocus(payload.index, demoData.focusImageKey, demoData.slides);
                DemoStore.emitChange();
                break;
        }
    });

    module.exports.DemoStore = DemoStore;
    module.exports.Flux = Flux;

    function addSlide(slide){
        demoData.slides.push(slide);
    }


    // adjusts focus on thumbnaiList after a thumbnail has been deleted
    function findFocus(deleteIndex, currentFocusKey, slides){
        // if deleteIndex is greater than currentFocusKey then focus is unchanged
        if(deleteIndex > currentFocusKey){
          return currentFocusKey;
        }
    
        /* options remaining
         * (1) slides remaining so focus moves to next slide up
         * (2) no slides left, focus goes to slide [0]
         */

        // if there are no slides left, set focus to slides[0]
        if(!slides.length){
          return 0;
        }

        // otherwise move focus up
        currentFocusKey = currentFocusKey ? currentFocusKey - 1 : 0;
        return currentFocusKey;
    }

})();