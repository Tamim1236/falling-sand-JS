function make2DArray(cols, rows){
  let arr = new Array(cols)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
    for(let j = 0; j < arr[i].length; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}

let w = 10; // sand grain width (resolution) - making it a 10x10 rectangle
let cols, rows, grid;

function setup(){
  createCanvas(400, 400)
  cols = width / w; // num columns
  rows = height / w; // num rows
  grid = make2DArray(cols, rows);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }

  grid[20][10] = 1;
}

function draw(){
  background(0);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      stroke(255); // set outline color - affects all shapes drawn after function call
      fill(grid[i][j]*255);
      let x = i * w; // x-position
      let y = j * w; // y-position
      square(x, y, w); // draw a square on the canvas
    }
  }

  let bufferGrid = make2DArray(cols, rows);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let state = grid[i][j];

      if(state === 1){
        let below = grid[i][j+1];
        if(below === 0){
          // cell "falls" down by 1
          bufferGrid[i][j] = 0;
          bufferGrid[i][j+1] = 1;
        }
      }
    }
  }

  grid = bufferGrid;
}