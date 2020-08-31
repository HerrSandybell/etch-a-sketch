const drawingGrid = document.querySelector('.drawing-grid');
const reset = documnet.querySelector('#reset');

window.addEventListener('load', generateGrid(4))

function generateGrid(size) {
  for (i=0; i <= size*size; i++) {
    let gridCell = document.createElement("div")
    gridCell.innerHTML = i;
    drawingGrid.appendChild(gridCell).className = "bla";
  }
}

reset.addEventListener('onclick', () => {
  prompt('Enter a new grid-')
})
