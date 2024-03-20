function LineToTool() {
	//set an icon and a name for the object
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//to smoothly draw we'll draw a line from the start mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var startMouseX = -1;
	var startMouseY = -1;

	//setting the variable "drawing" to false
	var drawing = false;

	this.draw = function () {

		//If the mouse is pressed & onWhiteBoard is true
		if (mouseIsPressed && onWhiteBoard) {

			//check if the startX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;

				//Set the variable "drawing" to true during the user click mouse
				drawing = true;

				//Loads the current value of each pixel on the canvas into the pixels array
				//Without this the previous line disappear everytime when user clicks mouse
				loadPixels();
			}
			//if the user has released the mouse we want to updates the canvas with the RGBA values in the pixels array using updatePixels().
			//Without this the past lines remains on screen
			else {
				updatePixels();

				//draw line between two points between where the user click mouse and the current location of the mouse 
				line(startMouseX, startMouseY, mouseX, mouseY);
			};
		}

		//if the user has released the mouse we want to set the startMouse values 
		//back to -1. Also, set the drawing value back to false.
		else if (drawing) {
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		};
	};
};
