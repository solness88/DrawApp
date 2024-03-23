//All this function is implemented for final assessment

function ScissorTool() {

    //set an icon and a name for the object
    this.icon = "assets/scissor.jpg";
    this.name = "scissor";
    var selectedImg;
    var scissorSampleImg;
    var scissorMode = "select";
    var selectedImgOptions = [];
    var selectedImgArray = [];

    //set selectedArea for scissor tool
    var selectedArea = { x: -1, y: -1, w: 0, h: 0 };

    this.unselectTool = function () {

        //clear options
        select(".options").html("");

        scissorMode = "select";
        selectedImgOptions = [];
        selectedImgArray = [];
        selectedImg = "";
    };

    this.handleImage = function () {

        //create img tag with styles
        scissorSampleImg = createImg(selectedImg.canvas.toDataURL(), 'selectedImg');
        scissorSampleImg.style('width', '100px');
        scissorSampleImg.style('height', '100px');
        scissorSampleImg.style('margin', '5px');
        scissorSampleImg.style('object-fit', 'cover');
        scissorSampleImg.style('opacity', '0.2');
        scissorSampleImg.style('pointer-events', 'none');

        //push img into array
        selectedImgOptions.push(scissorSampleImg);

        //add each image original common class
        scissorSampleImg.id(selectedImgOptions.length);
        scissorSampleImg.class("scissorSampleImages");

        //create span element over <img>
        this.spanElement = createSpan();
        this.spanElement.child(scissorSampleImg);
        select('.options').child(scissorSampleImg);

        //add selectedImage into array
        selectedImgArray.push(selectedImg);

        //last-selected rectangle area is automatically ready for the paste
        selectedImg = selectedImgArray[selectedImgArray.length - 1];

        //add last-cutted-off image samples border,
        //remobe border from other samples
        for (var i = 0; i < selectedImgOptions.length; i++) {
            selectedImgOptions[i].style('border', 'none');
        }
        selectedImgOptions[selectedImgOptions.length - 1].style('border', '2px solid red');

        //if the number of image options go over 5,
        //old options disappear
        if (selectedImgOptions.length > 5) {
            selectedImgOptions[0].remove();
            selectedImgOptions.shift();
            selectedImgArray.shift();

            //reset the id nums for image options
            for (var i = 0; i < selectedImgOptions.length; i++) {
                selectedImgOptions[i].id(i + 1);
            }
        }
    };

    this.populateOptions = function () {

        self.selectMode = createSpan(`<img src='assets/select.png' id='select' class='selectPaste'>`);

        self.pasteMode = createSpan(`<img src='assets/paste.png' id='paste' class='selectPaste'>`);

        select(".options").child(self.selectMode);
        select(".options").child(self.pasteMode);
        self.pasteMode.style('opacity', '0.2');

        select("#select").mouseClicked(function () {
            if (scissorMode == "paste") {
                scissorMode = "select";
                self.selectMode.style('opacity', '1');
                self.pasteMode.style('opacity', '0.2');
            }

            this.scissorsamples = selectAll(".scissorSampleImages");

            for (var i = 0; i < this.scissorsamples.length; i++) {
                this.scissorsamples[i].style('opacity', '0.2');
                this.scissorsamples[i].style('pointer-events', 'none');
            }
        });

        select("#paste").mouseClicked(function () {
            if (scissorMode == "select") {
                scissorMode = "paste";
                self.pasteMode.style('opacity', '1');
                self.selectMode.style('opacity', '0.2');
            }

            this.scissorsamples = selectAll(".scissorSampleImages");

            for (var i = 0; i < this.scissorsamples.length; i++) {
                this.scissorsamples[i].style('opacity', '1');
                this.scissorsamples[i].style('pointer-events', ' auto');
            }
        });
    };

    this.draw = function () {

        //select the clicked image sample
        if (selectedImgArray.length > 0) {
            for (let i = 1; i <= selectedImgOptions.length; i++) {
                select('#' + i).mouseClicked(function () {
                    selectedImg = selectedImgArray[i - 1];
                });
            }
        }

        if (mouseIsPressed && onWhiteBoard) {

            if (selectedImg && scissorMode == "paste") {
                this.imgX = mouseX - selectedImg.width / 2;
                this.imgY = mouseY - selectedImg.height / 2;
                image(selectedImg, this.imgX, this.imgY);
            }

            if (selectedArea.x == -1) {
                selectedArea.x = mouseX;
                selectedArea.y = mouseY;
                loadPixels();

            } else {
                selectedArea.w = mouseX - selectedArea.x;
                selectedArea.h = mouseY - selectedArea.y;
            }
            updatePixels();

            if (scissorMode == "select") {
                noStroke();
                fill(255, 0, 0, 50);
                loadPixels();
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            }
        }

        //if the user has released the mouse we want to set the previousMouse values back to -1.
        else {
            if (selectedArea.w != 0 && scissorMode == "select") {
                updatePixels();

                //Select from Lower-right to upper-left
                if (selectedArea.w < 0 && selectedArea.h < 0) {
                    selectedImg = get(mouseX, mouseY, selectedArea.x - mouseX, selectedArea.y - mouseY);

                    //Select from upper-right to lower-left
                } else if (selectedArea.w < 0 && selectedArea.h > 0) {
                    selectedImg = get(mouseX, selectedArea.h, selectedArea.x - mouseX, mouseY - selectedArea.y);

                    //Select from Lower-left to upper-right
                } else if (selectedArea.w > 0 && selectedArea.h < 0) {
                    selectedImg = get(selectedArea.x, selectedArea.y - mouseY, mouseX - selectedArea.x, selectedArea.y - mouseY);

                    //Select from upper-left to lower-right
                } else {
                    selectedImg = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                }

                this.handleImage();
            }

            selectedArea = { x: -1, y: -1, w: 0, h: 0 };
        }

        // set border to the selected sample image
        for (var i = 0; i < selectedImgOptions.length; i++) {
            selectedImgOptions[i].mouseClicked(function () {
                for (var j = 0; j < selectedImgOptions.length; j++) {
                    if (j != i) {
                        selectedImgOptions[j].style('border', 'none');
                    }
                }
                this.style('border', '3px solid red');
            });
        }
    };
}

