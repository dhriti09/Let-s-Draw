let colorInput, color2, weight, gradientCheck, clearBtn, undoBtn, saveBtn;
let canvasElement;
let pg; 

function setup() {
    canvasElement = createCanvas(window.innerWidth, window.innerHeight);
    pg = createGraphics(window.innerWidth, window.innerHeight);
    pg.background(255);
    
    // Selectors
    colorInput = select('#color');
    color2 = select('#color2');
    weight = select('#weight');
    gradientCheck = select('#gradient');
    
    // Button Listeners
    select('#clear').mousePressed(() => pg.background(255));
    select('#undo').mousePressed(undoLast);
    select('#save').mousePressed(() => saveCanvas('myDrawing', 'png'));
    
    // Enable/Disable second color
    gradientCheck.changed(() => {
        document.getElementById('color2').disabled = !gradientCheck.checked();
    });
}

function draw() {
    background(255);
    image(pg, 0, 0); // Show everything drawn so far

    if (mouseIsPressed) {
        strokeWeight(weight.value());
        let c1 = color(colorInput.value());
        
        // Handle Gradient Logic
        if (gradientCheck.checked()) {
            let c2 = color(color2.value());
            let lerpAmt = map(sin(frameCount * 0.1), -1, 1, 0, 1);
            stroke(lerpColor(c1, c2, lerpAmt));
            fill(lerpColor(c1, c2, lerpAmt));
        } else {
            stroke(c1);
            fill(c1);
        }

        handleTools();
    }
}

function handleTools() {
    let tool = document.querySelector('input[name="tool"]:checked').value;

    if (tool === 'Pencil') {
        pg.strokeWeight(weight.value());
        pg.stroke(colorInput.value());
        pg.line(pmouseX, pmouseY, mouseX, mouseY);
    } 
    else if (tool === 'Eraser') {
        pg.strokeWeight(weight.value());
        pg.stroke(255);
        pg.line(pmouseX, pmouseY, mouseX, mouseY);
    }
    else {
        // Previewing Shapes (Line, Rect, Circle)
        // This draws on the main canvas ONLY while dragging
        if (tool === 'Line') line(mouseX, mouseY, pmouseX, pmouseY); // Simplified preview
        if (tool === 'Rect') rect(mouseX, mouseY, 50, 50); 
    }
}

// Finalize shape on mouse release
function mouseReleased() {
    let tool = document.querySelector('input[name="tool"]:checked').value;
    pg.strokeWeight(weight.value());
    pg.stroke(colorInput.value());
    
}

function undoLast() {
    
    console.log("Undo logic: Push pg to an array on every mouseRelease");
}
