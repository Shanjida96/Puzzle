let TileSize = 100;
let tilesArray = Array.from({ length: 15 }, (_, i) => i + 1).concat();
let emptyIndex = 15;

function handleTileClick(index) {
  if (isAdjacent(index, emptyIndex)) {
    tilesArray[emptyIndex] = tilesArray[index];
    tilesArray[index] = 0;
    emptyIndex = index;
    renderTiles();
    if (isSolved()) {
      document.getElementById("message").style.display = "block";
    }
  }
}

function isAdjacent(a, b) {
  let rowA = Math.floor(a / 4);
  let colA = a % 4;
  let rowB = Math.floor(b / 4);
  let colB = b % 4;

  return (
    (Math.abs(rowA - rowB) === 1 && colA === colB) ||
    (Math.abs(colA - colB) === 1 && rowA === rowB)
  );
}

function renderTiles() {
  let container = document.getElementById("puzzle-container");
  container.innerHTML = "";
  tilesArray.forEach((value, index) => {
    let tile = document.createElement("div");
    tile.className = value === 0 ? "tile empty" : "tile";
    tile.textContent = value || "";
    tile.addEventListener('click',()=>handleTileClick(index));
    let row = Math.floor(index / 4);
    let col = index % 4;
    tile.style.top = `${row * TileSize}px`;
    tile.style.left = `${col * TileSize}px`;

    container.appendChild(tile);
  });
}

function isSolved() {
  for (let i = 0; i < 15; i++) {
    if (tilesArray[i] !== i + 1) {
      return false;
    }
  }
}

function shuffleTiles() {
  let currentEmpty = emptyIndex;
  for (let i = 0; i < 1000; i++) {
    let possibleMoves = [];
    let row = Math.floor(currentEmpty / 4);
    let col = currentEmpty % 4;

    if (row > 0) possibleMoves.push(currentEmpty - 4);
    if (row < 3) possibleMoves.push(currentEmpty + 4);
    if (col > 0) possibleMoves.push(currentEmpty - 1);
    if (col < 3) possibleMoves.push(currentEmpty + 1);

    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    tilesArray[currentEmpty] = tilesArray[move];
    tilesArray[move] = 0;
    currentEmpty = move;
  }
  emptyIndex = currentEmpty;
  renderTiles();
  document.getElementById("message").style.display = "none";
}

document.getElementById("shuffle-btn").addEventListener("click", shuffleTiles);
shuffleTiles();
