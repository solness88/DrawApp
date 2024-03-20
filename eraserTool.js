function EraserTool() {
	//set an icon and a name for the object
	this.icon = "assets/eraser.jpg";
	this.name = "eraser";

	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function () {
		//if the mouse is pressed
		// disable click outside of the whitespace
		if (mouseIsPressed && onWhiteBoard) {

			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}

			// Turn the color white
			//To avoid affecting other tools, put stroke(255) between push() and pop().
			else {
				push();
				stroke(255);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				pop();
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			};
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else {
			previousMouseX = -1;
			previousMouseY = -1;
		};
	};
};
