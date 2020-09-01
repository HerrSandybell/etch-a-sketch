// Declare DOM variables.
const documentRoot = document.documentElement;
const drawingGrid = document.querySelector('.drawing-grid');
const resetBtn = document.querySelector('#reset');
const controlToggleBtn = document.querySelector('#control-toggle');
const clearBtn = document.querySelector('#clear');

// etching control and color variables
let control = "mouseover";

const alpha = 0.1;
let color = `rgba(0,0,0,1)`;

/**** Declare functions ****/

// When reset button is clicked, prompt user for new grid size.
// If grid size is forced to be empty, set it to 4.
// Then, generate new Grid.
const resetGrid = function() {
  let newSize = prompt('Enter a new grid-');
  if(!newSize) {newSize = 4};
  drawingGrid.innerHTML = "";
  generateGrid(newSize);
}

const swapControlType = function() {
  if (control === "mouseover") {
    drawingGrid.removeEventListener(control, etchCell);
    control = "click";
    controlToggleBtn.textContent = "Hover Etch (e)";
    drawingGrid.addEventListener(control, etchCell);
  } else {
    drawingGrid.removeEventListener(control, etchCell);
    control = "mouseover";
    controlToggleBtn.textContent = `Click Etch (e)`;
    drawingGrid.addEventListener(control, etchCell);
  }
}

// reset grid cell background to white.
const clearGridCells = function() {
  let allCells = document.querySelectorAll('.grid-cells');
  allCells.forEach(item => {
    item.style.background = "";
  })
}

// toggle etched stated on and off
const etchCell = function(e) {
  background = e.target.style.background;
  // e.target.classList.toggle("etched");
  if(background) {
    e.target.style.background = "";
  } else {
    e.target.style.background = color // should be a function that returns color here;
  }
}

/**** GRID CREATION ****/

// Create a number of div grid cells equal to cell count.
function createCells(cellCount) {
  for (i=1; i <= cellCount*cellCount; i++) {
    let gridCell = document.createElement("div");
    gridCell.classList.add("grid-cells");
    gridCell.id = `grid-cell-${i}`;
    drawingGrid.appendChild(gridCell);
  }

  // attach hover elements to grid parent element and activate the effect on target child. This is more efficient and memory light than adding an event listener to all children.
  drawingGrid.addEventListener(control, etchCell);
}

// set css variables. cellNum sets the column and row numbers. cellSize sets width and height.
function setCellDimensions(cellCount){
  documentRoot.style.setProperty("--cellNum", cellCount);
  documentRoot.style.setProperty("--cellSize", (1000/cellCount)+"px");
}

// Generate a number of child divs equal to the square of the input.
function generateGrid(size) {
  createCells(size);
  setCellDimensions(size);
}

/**** EVENT LISTENERS ****/

// attach click listeners to buttons
resetBtn.addEventListener('click', resetGrid);
controlToggleBtn.addEventListener('click', swapControlType);
clearBtn.addEventListener('click', clearGridCells);

// Add keydown event listeners for all three buttons.
window.addEventListener('keydown', e => {
  const key = e.keyCode
  switch (key) {
    case 82: // r
      resetGrid();
      break;
    case 69: // e
      swapControlType();
      break;
    case 67: // c
      clearGridCells();
      break;
  }
})

// Load default 4x4 grid settings.
window.addEventListener('load', generateGrid(4))