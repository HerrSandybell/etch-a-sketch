const documentRoot = document.documentElement;
const drawingGrid = document.querySelector('.drawing-grid');
const resetBtn = document.querySelector('#reset');
const controlToggleBtn = document.querySelector('#control-toggle');
const clearBtn = document.querySelector('#clear');

// etching control and color variables
const alpha = 0.1;
let control = "mouseover";
let flatColor = `rgba(0,0,0,1)`;
let shadedColor = `rgba(0,0,0,0.5)`;

/**** BUTTON EVENT LISTENERS ****/

// When reset button is clicked, prompt user for new grid size.
// If grid size is forced to be empty, set it to 4.
// Then, generate new Grid.
resetBtn.addEventListener('click', () => {
  let newSize = prompt('Enter a new grid-');
  if(!newSize) {newSize = 4};
  drawingGrid.innerHTML = "";
  generateGrid(newSize);
})

// onclick: change etching control type between hover and click.
controlToggleBtn.addEventListener('click', () => {
  if (control === "mouseover") {
    drawingGrid.removeEventListener(control, etchCell);
    control = "click";
    controlToggleBtn.textContent = "Hover Etch";
    drawingGrid.addEventListener(control, etchCell);
  } else {
    drawingGrid.removeEventListener(control, etchCell);
    control = "mouseover";
    controlToggleBtn.textContent = "Click Etch";
    drawingGrid.addEventListener(control, etchCell);
  }
})

// reset all etched cells.
clearBtn.addEventListener('click', () => {
  let etchedCells = document.querySelectorAll('.etched');
  etchedCells.forEach(item => {
    item.classList.remove("etched");
  })
})

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
  console.log(control)
  drawingGrid.addEventListener(control, etchCell);
}

// set css variables. cellNum sets the column and row numbers. cellSize sets width and height.
function setCellDimensions(cellCount){
  documentRoot.style.setProperty("--cellNum", cellCount);
  documentRoot.style.setProperty("--cellSize", (1000/cellCount)+"px");
}

// toggle etched stated on and off
let etchCell = function(e) {
  background = e.target.style.background;
  // e.target.classList.toggle("etched");
  if(background) {
    e.target.style.background = ""
  } else {
    e.target.style.background = flatColor;
  }
}

// Generate a number of child divs equal to the square of the input.
function generateGrid(size) {
  createCells(size);
  setCellDimensions(size);
}

// Load default 4x4 grid settings.
window.addEventListener('load', generateGrid(4))