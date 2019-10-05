let panelData = [];

const borderWidth = 4;
const panelWidth = 32;
const panelHeight = 8;

let cellSize = 0;
let canvasWidth = 0;
let canvasHeight = 0;

let fillButton, reset;

let colorPicker;

function setup() {
    cellSize = (displayWidth - (borderWidth * (panelWidth - 1))) / panelWidth;
    canvasWidth = cellSize * panelWidth + (panelWidth - 1) * borderWidth;
    canvasHeight = cellSize * panelHeight + (panelHeight - 1) * borderWidth;

    createCanvas(canvasWidth, canvasHeight);
    background('grey');
    colorPicker = createColorPicker('#ff0000');

    reset = createButton('reset');
    reset.position(100,canvasHeight);
    reset.mousePressed(resetFunc);

    fillButton = createButton('fill');
    fillButton.position(200,canvasHeight);
    fillButton.mousePressed(fillFunc);



    for (var x = 0; x < panelWidth; x++) {
        panelData[x] = [];
        for (var y = 0; y < panelHeight; y++) {
            panelData[x][y] = color(0, 0, 0);
        }
    }
}

function resetFunc(){
    for (var x = 0; x < panelWidth; x++) {
        for (var y = 0; y < panelHeight; y++) {
            panelData[x][y]=0;
        }
    }
}
function fillFunc(){
    var color = colorPicker.color();
    for (var x = 0; x < panelWidth; x++) {
        for (var y = 0; y < panelHeight; y++) {
            panelData[x][y]=color;
        }
    }
}

function draw() {
    strokeWeight(1);
    for (var x = 0; x < panelWidth; x++) {
        for (var y = 0; y < panelHeight; y++) {
            fill(panelData[x][y]);
            rect((cellSize + borderWidth) * x, (cellSize + borderWidth) * y, cellSize, cellSize);
        }
    }
}

function mouseDragged() {
    if (mouseX >= 0 &&
        mouseX <= (cellSize + borderWidth) * panelWidth &&
        mouseY >= 0 && mouseY <= (cellSize + borderWidth) * panelHeight) {
            let x = mouseX;
            let y = mouseY;
            var color = colorPicker.color();
            var colorOld =panelData[int(x / (cellSize + borderWidth))][int(y / (cellSize + borderWidth))];

            //If the color has not changed, don't update it
            if (!(
                red(color)==red(colorOld) &&
                green(color)==green(colorOld) &&
                blue(color)==blue(colorOld))){

                // TODO: this is where we push the change to the server
                panelData[int(x / (cellSize + borderWidth))][int(y / (cellSize + borderWidth))] = color;
            }
        }
    }
