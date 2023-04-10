const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let isPaused = false;
let frameDelay = 100;
let zoomLevel = 4;
const cellSize = 5;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;
let grid;

function createGrid() {
  return new Array(rows).fill(null).map(() => new Array(cols).fill(false));
}

function randomizeGrid(grid) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() < 0.5;
    }
  }
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      drawCell(grid, i, j);
    }
  }
}

function drawCell(grid, i, j) {
  ctx.beginPath();
  ctx.rect(
    j * cellSize * zoomLevel,
    i * cellSize * zoomLevel,
    cellSize * zoomLevel,
    cellSize * zoomLevel
  );
  ctx.fillStyle = grid[i][j] ? "black" : "white";
  ctx.fill();
  ctx.stroke();
}

function nextGeneration(grid) {
  const newGrid = createGrid();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countNeighbors(grid, i, j);
      if (grid[i][j]) {
        newGrid[i][j] = neighbors === 2 || neighbors === 3;
      } else {
        newGrid[i][j] = neighbors === 3;
      }
    }
  }
  return newGrid;
}

function countNeighbors(grid, x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = (x + i + rows) % rows;
      const newY = (y + j + cols) % cols;
      count += grid[newX][newY] ? 1 : 0;
    }
  }
  return count;
}

async function gameLoop() {
  if (!isPaused) {
    grid = nextGeneration(grid);
    drawGrid(grid);
  }
  await new Promise((resolve) => setTimeout(resolve, frameDelay));
  requestAnimationFrame(gameLoop);
}

function init() {
  grid = createGrid();
  randomizeGrid(grid);
  drawGrid(grid);

  const pausePlayButton = document.getElementById("pausePlayButton");
  const stepButton = document.getElementById("stepButton");
  const speedRange = document.getElementById("speedRange");
  const speedPercentage = document.getElementById("speedPercentage");
  const resetButton = document.getElementById("resetButton");
  const zoomRange = document.getElementById("zoomRange");

  pausePlayButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pausePlayButton.textContent = isPaused ? "Play" : "Pause";
    stepButton.disabled = !isPaused;
  });

  stepButton.addEventListener("click", () => {
    if (isPaused) {
      grid = nextGeneration(grid);
      drawGrid(grid);
    }
  });

  speedRange.addEventListener("input", (event) => {
    frameDelay = 101 - event.target.value;
    speedPercentage.textContent = `${event.target.value}%`;
  });

  resetButton.addEventListener("click", () => {
    randomizeGrid(grid);
    drawGrid(grid);
  });

  zoomRange.addEventListener("input", (event) => {
    zoomLevel = parseInt(event.target.value);
    drawGrid(grid);
  });

  gameLoop();
}

init();

// Functions for handling click toggle
function getGridCoords(canvasX, canvasY) {
  const gridX = Math.floor(canvasY / cellSize);
  const gridY = Math.floor(canvasX / cellSize);
  return { gridX, gridY };
}

function toggleCellState(grid, gridX, gridY) {
  grid[gridX][gridY] = !grid[gridX][gridY];
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const canvasX = event.clientX - rect.left;
  const canvasY = event.clientY - rect.top;
  const { gridX, gridY } = getGridCoords(canvasX, canvasY);
  toggleCellState(grid, gridX, gridY);
  drawGrid(grid);
});
