//All this function is implemented for final assessment

function UpLoadImageTool() {
    //set an icon and a name for the object
    this.icon = "assets/camera.jpg";
    this.name = "camera";

    var self = this;

    var imgArray = [];
    var imgArrOptions = [];
    var selectedImg;

    //Buttons and image samples downside will disappear 
    //when other tool selected
    this.unselectTool = function () {
        select(".options").html("");
        imgArray = [];
        imgArrOptions = [];
    };

    this.handleImage = function (file) {
        // Check if the file type is "image"
        if (file.type === 'image') {
            self.image = loadImage(file.data);

            //create img tag
            self.sampleImage = createImg(file.data, "sample");
            self.sampleImage.style('width', '100px');
            self.sampleImage.style('height', '100px');
            self.sampleImage.style('object-fit', 'cover');

            //add each image original ID
            self.sampleImage.id(imgArrOptions.length);

            //push img into array
            imgArrOptions.push(self.sampleImage);

            //create <span> element over <img>
            var spanElement = createSpan();
            spanElement.child(self.sampleImage);
            select('.options').child(spanElement);
        };

        //get image as p5.js image
        imgArray.push(self.image);

        //choose last selected image
        selectedImg = imgArray[imgArray.length - 1];

        //add last-uploaded image samples border,
        //remobe border from other samples
        for (var i = 0; i < imgArrOptions.length; i++) {
            imgArrOptions[i].style('border', 'none');
        };
        imgArrOptions[imgArrOptions.length - 1].style('border', '2px solid blue');
    };

    // make upload button appear on the downside
    this.populateOptions = function () {

        // upload button
        this.uploadButton = createFileInput(this.handleImage);
        var spanElement = createSpan();
        spanElement.child(this.uploadButton);
        select(".options").child(spanElement);

    };

    this.draw = function () {

        // select one from the image samples
        if (imgArrOptions.length > 0) {
            for (let i = 0; i < imgArrOptions.length; i++) {
                select('#' + i).mouseClicked(function () {
                    selectedImg = imgArray[i];
                });
            };
        };

        if (self.image && mouseIsPressed && onWhiteBoard) {
            var orgWidth = selectedImg.width;
            var orgHeight = selectedImg.height;

            // change the width according to the slider 
            var mappedWidth = map(sizeSlider.value(), 1, 100, 50, 500);

            //adjust height retaining the aspect ratio
            var mappedHeight = orgHeight * (mappedWidth / orgWidth);

            var picX = mouseX - mappedWidth / 2;
            var picY = mouseY - mappedHeight / 2;

            image(selectedImg, picX, picY, mappedWidth, mappedHeight);
        };

        // set border to the selected sample image
        for (var i = 0; i < imgArrOptions.length; i++) {
            imgArrOptions[i].mouseClicked(function () {
                for (var j = 0; j < imgArrOptions.length; j++) {
                    if (j != i) {
                        imgArrOptions[j].style('border', 'none');
                    };
                };
                this.style('border', '2px solid blue');
            });
        };
    };
};
