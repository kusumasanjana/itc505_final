document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const gridSize = 5;

    function createBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener("click", toggleSquare);
            board.appendChild(square);
        }
    }

    function toggleSquare() {
        this.classList.toggle("is-off");
        toggleNeighbors(this);
        checkWin();
    }

    function toggleNeighbors(clickedSquare) {
        const index = Array.from(clickedSquare.parentNode.children).indexOf(clickedSquare);
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        const directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 },  // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }   // Right
        ];

        directions.forEach(direction => {
            const newRow = row + direction.row;
            const newCol = col + direction.col;

            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                const neighborIndex = newRow * gridSize + newCol;
                const neighborSquare = clickedSquare.parentNode.children[neighborIndex];
                neighborSquare.classList.toggle("is-off");
            }
        });
    }

    function checkWin() {
        const blackSquares = document.querySelectorAll(".square.is-off");
        if (blackSquares.length === gridSize * gridSize) {
            window.alert(" Heyy You win!");
            resetBoard();
        }
    }

    function resetBoard() {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.classList.remove("is-off");
        });
        randomizeSolvableBoard();
    }

    function randomizeSolvableBoard() {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.classList.remove("is-off");
        });

        // Perform a series of random moves to generate a solvable puzzle
        for (let i = 0; i < gridSize * gridSize * 2; i++) {
            const randomIndex = Math.floor(Math.random() * (gridSize * gridSize));
            const randomSquare = squares[randomIndex];
            toggleNeighbors(randomSquare);
        }
    }

    createBoard();
    randomizeSolvableBoard();
});
