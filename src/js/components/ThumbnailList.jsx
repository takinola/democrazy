(function(){

  var React = require("react")
  , utils = require("../utils/utils.js")
  , DemoActions = require("../actions/DemoActions.js")
  , _ = require("underscore")
  , PlaceHolderThumbnail = require("./PlaceHolderThumbnail.jsx")
  , FileUploadSpinner = require("./FileUploadSpinner.jsx")
  ;


  var dropPad = document.createElement("li");
  dropPad.className = "dropPad";

  var ThumbnailList = React.createClass({
    getInitialState: function(){
      return (
          {
            data: this.props.data,
            dragOverStatus: null,
            displayPlaceholder: true,
            displayFileUploadSpinner: false,
            thumbnailDeleteButton: [],
          }
        );
    },

    uploadFile: function(file, clbk){
      var slide = {};
      var reader = new FileReader();
      reader.onload = function(e){
        slide.src = e.target.result;
        clbk(null, slide);
      }

      reader.readAsDataURL(file);
    },

    dragOverList: function(e){
      e.preventDefault();
      //e.stopPropagation();

      // highlight the dropzone if the user is trying to drop a file
      if(e.dataTransfer.files.length){
        this.setState(utils.changeState(this.state, {dragOverStatus: "fileHover", displayPlaceholder: false}));
      }

      // return false;
    },

    dragLeaveList: function(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.dataTransfer.files){
        this.setState(utils.changeState(this.state, {dragOverStatus: null, displayPlaceholder: true}));
      }

      //return false;
    },

    onDropInList: function(e){
      e.preventDefault();
      e.stopPropagation();
      
      // if this is an external file dropped into the list
      if(e.dataTransfer.files){
        this.setState(utils.changeState(this.state, {dragOverStatus: null})); // reset fileHover class

        var files = e.dataTransfer.files;
        _.forEach(files, function(file){
          // check for valid file type
          var validFileTypes = {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true
          };

          if(validFileTypes[file.type]){
            // display pending update sticker
            this.setState(utils.changeState(this.state, {displayFileUploadSpinner: true}));

            // upload file
            this.uploadFile(file, (function(status, slide){
              if(!status){
                this.setState(utils.changeState(this.state, {displayFileUploadSpinner: false})); // turn off spinner
                DemoActions.addSlide(slide);  // update store

                // set focus to latest added image
                DemoActions.setThumbnailFocus(this.props.data.slides.length);
              }
            }).bind(this));
          }
        }, this);
      }

      // return false;
    },

    handleClickItem: function(e){
      e.preventDefault();
      //e.stopPropagation();
      var focus = Number(e.currentTarget.dataset.id);
      DemoActions.setThumbnailFocus(focus);
    },

    dragStartItem: function(e){
      this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.currentTarget);  // for FireFox compatibility
    },

    dragOverItem: function(e){
      if(!e.dataTransfer.files.length){
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.currentTarget.className === "dropPad"){ return;}
        this.over = e.currentTarget;

        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.currentTarget.parentNode;

        if(relY > height) {
          this.nodePlacement = "after";
          parent.insertBefore(dropPad, e.currentTarget.nextElementSibling);
        }

        else if(relY < height) {
          this.nodePlacement = "before"
          parent.insertBefore(dropPad, e.currentTarget);
        }
      }
    },

    dragEndItem: function(e){
      e.preventDefault();
      //e.stopPropagation();
      this.dragged.style.display = "block";
      this.dragged.parentNode.removeChild(dropPad);
      var data = this.state.data;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);

      // rearrange the slides to reflect the new positions
      var slideOrder = [];
      // remove the moved slide from the list
      var preSlides = data.slides.slice(0, from);
      var postSlides = data.slides.slice(from+1, data.slides.length);
      var slides = preSlides.concat(postSlides); 
      
      // reinsert the moved slide in the proper position
      var flag = false;
      _.forEach(slides, function(slide, key){
        if(key === to){
          slideOrder.push(data.slides[from]);
          flag = true;
        }
        slideOrder.push(slide);
      });
      if(!flag){
        slideOrder.push(data.slides[from]);  // if the moved slide has not been added, it must be in the last place
      }
      data.slides = slideOrder;

      this.setState(utils.changeState(this.state, {data: data}));
      DemoActions.setThumbnailFocus(to);
    },

    onMouseOver: function(e){
      e.preventDefault();
      e.stopPropagation();
      var target = e.currentTarget.dataset.id;
      this.state.thumbnailDeleteButton[target].state = true;
      this.setState(this.state);
    },

    onMouseLeave: function(e){
      e.preventDefault();
      e.stopPropagation();
      var target = e.currentTarget.dataset.id;
      this.state.thumbnailDeleteButton[target].state = false;
      this.setState(this.state);
    },

    deleteThumbnail: function(e){
      e.preventDefault();
      e.stopPropagation();
      var target = Number(e.currentTarget.getAttribute("data-id"));
      DemoActions.deleteSlide(target);
    },

    renderDeleteButton: function(indx){
      var deleteButtonRender = (
          <img src="src/icons/close.png" width="30px" height="auto" className="delete-thumbnail" data-id={indx} onClick={this.deleteThumbnail} />
      );
      this.state.thumbnailDeleteButton[indx] = this.state.thumbnailDeleteButton[indx] || {};
      var displayDeleteButton = this.state.thumbnailDeleteButton[indx].state ? deleteButtonRender : null;
      return displayDeleteButton;
    },

    render: function(){
      if(this.state.data.slides.length){
        this.state.displayPlaceholder = false;  // turn off the "drop files here sign if there are already files"
        var thumbnails = this.state.data.slides.map(function(slide, i){
          var focusClass = (i === this.props.data.focusImageKey) ? "focus" : "";  // determine if this thumbnail is in focus
          var thumbnailDeleteButton = this.renderDeleteButton(i);  // determine if thumbnail delete button is visible

          return (
            <li
              data-id={i}
              key={i}
              draggable="true"
              className={"thumbnails " + focusClass}
              onClick= {this.handleClickItem}
              onDragEnd={this.dragEndItem}
              onDragStart={this.dragStartItem}
              onDragOver={this.dragOverItem}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
            >
              <div className="thumbnail-div">
                <img src={slide.src} width="100%" />
                {thumbnailDeleteButton}
              </div>
            </li>
          );
        }, this);
      }

      return (
        <div id="thumbnailListContainer">
          <FileUploadSpinner display={this.state.displayFileUploadSpinner} />
          <ul id="thumbnailList" 
              onDragOver={this.dragOverList} 
              onDragLeave={this.dragLeaveList} 
              onDrop={this.onDropInList}
              className={this.state.dragOverStatus}
          >
              {thumbnails}
          </ul>
          <PlaceHolderThumbnail display={this.state.displayPlaceholder} />
        </div>
      );
    }
  });

  module.exports = ThumbnailList;

})();