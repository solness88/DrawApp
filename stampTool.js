function StampTool(stampArray, sizeSlider) {
    //set an icon and a name for the object
    this.icon = "assets/bus.jpg";
    this.name = "bus";

    var self = this;

    // receive stamp images from sketch.js
    self.stamp = stampArray[0];

    // the stamp names for alternative images downside
    self.stamps = ["bus", "mtFuji", "bridge"];

    //When choosing stamptool remove the alternatives of other tools from the bottom
    this.unselectTool = function () {
        select(".options").html("");
    };

    //stamp alternatives appears on the downside 
    this.populateOptions = function () {

        //the stamp alternatives appear on the downside
        //create path for src, id, and class for img tag
        for (var i = 0; i < stampArray.length; i++) {
            self.imagePath = "assets/" + self.stamps[i] + ".jpg";
            self.stampId = self.stamps[i] + "Image";

            //create img tag under span for alternatives
            self.stampChoice = createSpan(`<img src='${self.imagePath}' id='${self.stampId}' class='stampClass'>`);

            //display the img
            select(".options").child(self.stampChoice);
        }

        //bus stamp is selected at the beginning
        select("#busImage").addClass("clicked");

        //when clicking one of icon alternatives the "clicked"class added
        //at the same time the "clicked" class of other alternatives removed
        select("#busImage").mouseClicked(function () {
            select("#mtFujiImage").removeClass("clicked");
            select("#bridgeImage").removeClass("clicked");
            select("#busImage").addClass("clicked");
            self.stamp = stampArray[0];
        });

        //mtFuji image stamp is selected
        select("#mtFujiImage").mouseClicked(function () {
            select("#busImage").removeClass("clicked");
            select("#bridgeImage").removeClass("clicked");
            select("#mtFujiImage").addClass("clicked");
            self.stamp = stampArray[1];
        });

        //bridge image stamp is selected
        select("#bridgeImage").mouseClicked(function () {
            select("#busImage").removeClass("clicked");
            select("#mtFujiImage").removeClass("clicked");
            select("#bridgeImage").addClass("clicked");
            self.stamp = stampArray[2];
        });
    };

    this.draw = function () {
        if (mouseIsPressed && onWhiteBoard) {
            //adjust stamp size cause it's too small to see when the width and height is 1
            this.stampSize = map(sizeSlider.value(), 1, 100, 20, 150);

            var stampX = mouseX - this.stampSize / 2;
            var stampY = mouseY - this.stampSize / 2;

            image(self.stamp, stampX, stampY, this.stampSize, this.stampSize);

        }
    };
}
