function HelperFunctions() {

    var drawing = false;
    var scrollSpeed = 10;
    var screenShot;
    var capturedImage;

    //p5.dom click click events. Notice that there is no this. at the
    //start we don't need to do that here because the event will
    //be added to the button and doesn't 'belong' to the object
    //event handler for the clear button event. Clears the screen
    select("#clearButton").mouseClicked(function () {
        background(255);
        screenshots = [];
        screenshots.push(get());
        currentStep = 1;

        //call loadPixels to update the drawing state
        //this is needed for the mirror tool
        loadPixels();
    });

    var self = this;

    //event handler for the save image button. saves the canvsa to the
    //local file system.
    select("#saveImageButton").mouseClicked(function () {
        saveCanvas('myCanvas', 'png');
    });

    //FINAL MoveUp button
    select("#moveUpButton").mouseClicked(function () {
        self.moveUp();
    });

    //FINAL MoveDown button
    select("#moveDownButton").mouseClicked(function () {
        self.moveDown();
    });

    //FINAL MoveRight button
    select("#moveRightButton").mouseClicked(function () {
        self.moveRight();
    });

    //FINAL MoveLeft button
    select("#moveLeftButton").mouseClicked(function () {
        self.moveLeft();
    });

    //moveUp function
    self.moveUp = function () {
        screenShot = get();
        capturedImage = get(0, 0, 1000, 10);
        image(screenShot, 0, -scrollSpeed);
        image(capturedImage, 0, 500);
        screenshots.push(get());
        currentStep++;
    };

    //moveDown function
    self.moveDown = function () {
        screenShot = get();
        capturedImage = get(0, 500, 1000, 10);
        image(screenShot, 0, scrollSpeed);
        image(capturedImage, 0, 0);
        screenshots.push(get());
        currentStep++;
    };

    //moveRight function
    self.moveRight = function () {
        screenShot = get();
        capturedImage = get(990, 0, 10, 510);
        image(screenShot, scrollSpeed, 0);
        image(capturedImage, 0, 0);
        screenshots.push(get());
        currentStep++;
    };

    //moveLeft function
    self.moveLeft = function () {
        screenShot = get();
        capturedImage = get(0, 0, 10, 500);
        image(screenShot, -scrollSpeed, 0);
        image(capturedImage, 990, 0);
        screenshots.push(get());
        currentStep++;
    };

    //FINAL undo button for undo/redo function
    select("#undoButton").mouseClicked(function () {
        undoButton = true;
        if (currentStep >= 2) {
            background(255);
            image(screenshots[currentStep - 2], 0, 0);
            currentStep--;
        }
    });

    //FINAL redo button for undo/redo function
    select("#redoButton").mouseClicked(function () {
        if (currentStep >= 1 && currentStep != screenshots.length) {
            background(255);
            image(screenshots[currentStep], 0, 0);
            currentStep++;
        }
    });

    //colorPalette
    self.colorPalette = function () {
        var color = myPicker.value();
        fill(color);
        stroke(color);
    };
}
