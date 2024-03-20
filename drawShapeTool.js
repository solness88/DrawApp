function DrawShapeTool() {
    //set an icon and a name for the object
    this.icon = "assets/rectangle.jpg";
    this.name = "shape";

    var self = this;

    //setting the variable "drawing" to false
    var drawing = false;

    //the shape names for alternative images downside
    this.shapeArray = ["rectangle", "circle", "triangle"];

    //When one of the three options is clicked, the name of the corresponding shape
    //turns to be true and remaining two turn to be false.
    //At first self.rectabgle is true
    self.rectangle = true;
    self.circle = false;
    self.triAngle = false;

    //the innerside of the shape is filled when this is true
    self.fillInside = false;

    //When choosing other tools remove the alternatives from the bottom
    this.unselectTool = function () {

        //clear options
        select(".options").html("");
    };

    //shape alternatives appears on the downside 
    this.populateOptions = function () {

        //the shape alternatives appear on the downside
        //create path for src, id, and class for img tag
        for (var i = 0; i < this.shapeArray.length; i++) {
            this.imagePath = "assets/" + this.shapeArray[i] + ".jpg";
            this.shapeId = this.shapeArray[i] + "Image";

            //create img tag under span for alternatives
            this.shapeChoice = createSpan(`<img src='${this.imagePath}' id='${this.shapeId}' class='shapeClass'>`);

            // display the img
            select(".options").child(this.shapeChoice);
        }

        //bus stamp is selected at the beginning
        select("#rectangleImage").addClass("clicked");

        //when clicking one of icon alternatives the "clicked"class added
        //at the same time the "clicked" class of other alternatives removed
        select("#rectangleImage").mouseClicked(function () {
            select("#circleImage").removeClass("clicked");
            select("#triangleImage").removeClass("clicked");
            select("#rectangleImage").addClass("clicked");
        });

        //circle image stamp is selected
        select("#circleImage").mouseClicked(function () {
            select("#rectangleImage").removeClass("clicked");
            select("#triangleImage").removeClass("clicked");
            select("#circleImage").addClass("clicked");
        });

        //triangle image stamp is selected
        select("#triangleImage").mouseClicked(function () {
            select("#rectangleImage").removeClass("clicked");
            select("#circleImage").removeClass("clicked");
            select("#triangleImage").addClass("clicked");
        });

        self.fillOption = createSpan(`<img src='assets/fill.png' id='fill' class='fillUnfill'>`);

        self.unfillOption = createSpan(`<img src='assets/unfill.png' id='unfill' class='fillUnfill'>`);

        select(".options").child(self.fillOption);
        select(".options").child(self.unfillOption);
        self.fillOption.style('opacity', '0.5');
        self.fillOption.style('margin-left', '100px');

        select("#fill").mouseClicked(function () {
            if (!self.fillInside) {
                self.fillInside = true;
                self.unfillOption.style('opacity', '0.5');
                self.fillOption.style('opacity', '1');
            }
        });

        select("#unfill").mouseClicked(function () {
            if (self.fillInside) {
                self.fillInside = false;
                self.fillOption.style('opacity', '0.5');
                self.unfillOption.style('opacity', '1');
            }
        });
    };

    //check if they previousX and Y are -1. set them to the current
    //mouse X and Y if they are.	
    var previousMouseX = -1;
    var previousMouseY = -1;

    this.draw = function () {
        select("#rectangleImage").mouseClicked(function () {
            self.circle = self.triAngle = false;
            self.rectangle = true;
        });

        select("#circleImage").mouseClicked(function () {
            self.rectangle = self.triAngle = false;
            self.circle = true;
        });

        select("#triangleImage").mouseClicked(function () {
            self.circle = self.rectangle = false;
            self.triAngle = true;
        });

        // if the mouse is pressed & the rectangle is selected
        //the rectangle image is drawn
        if (mouseIsPressed && self.rectangle && onWhiteBoard) {

            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            //if we already have values for previousX and Y we can draw rectangle
            else {

                // Whether self.fillInside is true or false determines whether the content is painted or not
                push();
                if (!self.fillInside) {
                    noFill();
                }
                updatePixels();

                //rectangle
                rect(previousMouseX,
                    previousMouseY,
                    mouseX - previousMouseX,
                    mouseY - previousMouseY
                );
                pop();
            }
        }

        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        else if (self.rectangle) {
            drawing = false;
            previousMouseX = -1;
            previousMouseY = -1;
        }

        // draw circle
        if (mouseIsPressed && self.circle && onWhiteBoard) {

            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            else {
                push();
                if (!self.fillInside) {
                    noFill();
                }
                updatePixels();
                ellipse(
                    //center of circle
                    mouseX - (mouseX - previousMouseX) / 2,
                    mouseY - (mouseY - previousMouseY) / 2,
                    //width and height
                    mouseX - previousMouseX,
                    mouseY - previousMouseY
                );
                pop();
            }
        }
        else if (self.circle) {
            drawing = false;
            previousMouseX = -1;
            previousMouseY = -1;
        }

        // draw triangle
        if (mouseIsPressed && self.triAngle && onWhiteBoard) {
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            else {
                push();
                if (!self.fillInside) {
                    noFill();
                }
                updatePixels();
                triangle(
                    //Top of triangle
                    mouseX - (mouseX - previousMouseX) / 2,
                    previousMouseY,

                    //Bottom right
                    mouseX,
                    mouseY,

                    //Bottom left
                    previousMouseX,
                    mouseY
                );
                pop();
            }
        }
        else if (self.triAngle) {
            drawing = false;
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };
}
