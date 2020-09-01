// Declare DOM variables.
const documentRoot = document.documentElement;
const drawingGrid = document.querySelector('.drawing-grid');
const resetBtn = document.querySelector('#reset');
const controlToggleBtn = document.querySelector('#control-toggle');
const clearBtn = document.querySelector('#clear');
const colorSelect = document.querySelector('select');

// etching control and color variables
let control = "mouseover";

const alpha = 0.1;
let color;

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
    item.style.background = "white";
  })
}

// toggle etched stated on and off
const etchCell = function(e) {
  const colorChoice = colorSelect.selectedIndex;
  const backgroundColor = e.target.style.backgroundColor;

  // this function assigns color to background from the switch statements
  const setBackgroundColor = function(color) {
    e.target.style.backgroundColor = color;
  }

  switch (colorChoice) {
    // black/white
    case 0: {    
      if (backgroundColor !== "black") {
        setBackgroundColor('black')
      } else {
        setBackgroundColor('white')
      }
      break;
    }

    // grayscale gradation
    case 1: {

      let alpha = 0.1;
      currentAlpha = parseFloat(backgroundColor.slice(13, 17))
      // if cell is greying then increase alpha by 0.1.
      console.log(backgroundColor)
      if (backgroundColor.includes('rgba') && currentAlpha < 1) {
        color = `rgba(0,0,0,${0.1 + currentAlpha}`;
        setBackgroundColor(color);
      } else if (backgroundColor == 'rgb(0, 0, 0)') {
        color = `rgb(0, 0, 0)`;
        setBackgroundColor(color);
      }
      else {
        color = `rgba(0,0,0,${alpha})`;
        setBackgroundColor(color);
      }
      break;
    }
    
    // crazy colors
    case 2: {
      const colorRange = ['red', 'green', 'blue'];
      if(!colorRange.includes(backgroundColor)) {
        setBackgroundColor(colorRange[Math.floor(Math.random() * 3)])
      } else {
        setBackgroundColor("white");
      }
      break;
    }
  }
}

/**** GRID CREATION ****/

// Create a number of div grid cells equal to cell count.
function createCells(cellCount) {
  for (i=1; i <= cellCount*cellCount; i++) {
    let gridCell = document.createElement("div");
    gridCell.classList.add("grid-cells");
    gridCell.id = `grid-cell-${i}`;
    gridCell.style.backgroundColor = "white"
    drawingGrid.appendChild(gridCell);
  }

  // attach hover elements to grid parent element and activate the effect on target child. This is more efficient and memory light than adding an event listener to all children.
  drawingGrid.addEventListener(control, etchCell);
}

// set css variables. cellNum sets the column and row numbers. cellSize sets width and height.
function setCellDimensions(cellCount){
  documentRoot.style.setProperty("--cellNum", cellCount);
  documentRoot.style.setProperty("--cellSize", (750/cellCount)+"px");
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