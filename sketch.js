//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var helpers = null;
var lineW = null;

//slider to change the line width and stamp size
var sizeSlider;

//array for stamp tool
var stampArray = [];

//boolean: whether the mouse is inside the white part of the screen
var onWhiteBoard = true;

//boolean to check whether the mouse is released or not
var isMouseReleased;

//FINAL screenshots array for undo/redo button
//using currentStep the user can go back and forward 
var screenshots = [];
var currentStep = 1;

//use myPicker to create colorPicker
var myPicker;

//var moveCanvasBtn = false;
var undoButton = false;

var bus;
var mtFuji;
var bridge;

function preload() {
    // icon images for stamptool
    bus = loadImage('assets/bus.jpg');
    mtFuji = loadImage('assets/mtFuji.jpg');
    bridge = loadImage('assets/bridge.jpg');
}

function setup() {
    // create array of stampImages
    stampArray = [bus, mtFuji, bridge];

    //create a canvas to fill the content div from index.html
    canvasContainer = select('#content');
    //var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    var c = createCanvas(1000, 510);
    c.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    // create size slide and its description
    sliderDescription =
        createP('Adjust the size:')
            .style('display', 'inline')
            .style('color', 'black')
            .style('font-weight', 'lighter')
            .style('fontSize', '0.8em');
    sizeSlider = createSlider(1, 100, 5);
    select('#slideBar').child(sliderDescription);
    select('#slideBar').child(sizeSlider);

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new sprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new StampTool(stampArray, sizeSlider));
    toolbox.addTool(new DrawShapeTool());
    toolbox.addTool(new UpLoadImageTool());
    toolbox.addTool(new ScissorTool());

    background(255);

    //FINAL get white screenshot before start writing for Undo function
    screenshots.push(get());

    //FINAL create color picker
    myPicker = createColorPicker('deeppink');
    myPicker
        .style('width', '200px')
        .style('height', '80px')
        .style('margin-left', '50px')
        .style('margin-top', '20px');
    select('.colourPalette').child(myPicker);

    //FINAL color picker text
    cPaletteText =
        createP('Choose color here!')
            .style('color', 'white')
            .style('font-weight', 'lighter')
            .style('fontSize', '0.7em')
            .style('margin-left', '50px')
            .style('margin-top', '0px');
    select('.colourPalette').child(cPaletteText);
};

//Ensure that lines do not protrude when clicking just outside of white space
function mousePressed() {

    if (mouseX >= 0 && mouseX <= canvasContainer.size().width && mouseY >= 0 && mouseY <= canvasContainer.size().height) {

        onWhiteBoard = true;
        scissorMouseDrag = true;

        //FINAL clear the screenshot array when it back to white
        if (currentStep == 1) {
            screenshots = [];
            screenshots.push(get());
        }
    }
    else {
        onWhiteBoard = false;
    }
}

//FINAL save screenshots to the array every time the user releaes mouse
function mouseReleased() {
    if (!isMouseReleased && mouseX >= 0 && mouseX <= canvasContainer.size().width && mouseY >= 0 && mouseY <= canvasContainer.size().height) {
        currentStep++;
        screenshots.push(get());
        isMouseReleased = true;
        scissorMouseDrag = false;
    }
}

function draw() {
    isMouseReleased = false;
    helpers.colorPalette();

    // adjust strokeWeight with sizeslider on top of screen
    this.size = sizeSlider.value();
    strokeWeight(this.size);

    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}
