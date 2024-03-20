function FreehandTool() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    // Boolean for gradation color
    var gradationBoolean = false;

    // Clear options of other tools on the downside
    this.unselectTool = function () {
        select(".options").html("");
    };

    // make options appear on the downside
    this.populateOptions = function () {

        //shapes appears on the downside
        this.gradationChoice = createSpan(`<img src='assets/gradation.jpg' id='gradationChoice'>`);

        var optionsClass = select(".options");
        optionsClass.child(this.gradationChoice);
    };

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    this.draw = function () {

        // if choose the gradation button switch the boolean to true
        select("#gradationChoice").mouseClicked(function () {
            gradationBoolean = true;
            this.style('border', '3px solid red');
        });

        // when click the button switch the boolean to false
        select(".colourPalette").mouseClicked(function () {

            //remove border from the gradation button  
            //only when the freehandtool is selected
            if (toolbox.selectedTool instanceof FreehandTool) {
                gradationBoolean = false;
                select("#gradationChoice").style('border', 'none');
            }
        });


        //if the mouse is pressed
        /// disable click outside of the whitespace
        if (mouseIsPressed && onWhiteBoard) {

            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;

            }

            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {

                // if boolean is true the color switch to gradation
                //push() and pop() to avoid affecting other colors
                push();
                if (gradationBoolean) {
                    red = random(0, 255);
                    green = random(0, 255);
                    blue = random(0, 255);
                    fill(red, green, blue);
                    stroke(red, green, blue);
                }

                //here draws the free lines
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                pop();
            }
        }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };
}
