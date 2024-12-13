document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gomoku");
    const ctx = canvas.getContext("2d");
    const size = 15; // 棋盘大小
    const cellSize = canvas.width / size;
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    let currentPlayer = "black";

    const drawBoard = () => {
        for (let i = 0; i <= size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }
    };

    const placeStone = (x, y) => {
        ctx.beginPath();
        ctx.arc(
            x * cellSize + cellSize / 2,
            y * cellSize + cellSize / 2,
            cellSize / 2.5,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = currentPlayer;
        ctx.fill();
        board[x][y] = currentPlayer;
        currentPlayer = currentPlayer === "black" ? "white" : "black";
    };

    const checkWin = (x, y) => {
        const directions = [
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 }
        ];
        const player = board[x][y];

        for (let { dx, dy } of directions) {
            let count = 1;
            for (let i = 1; i < 5; i++) {
                const nx = x + dx * i;
                const ny = y + dy * i;
                if (nx >= 0 && nx < size && ny >= 0 && ny < size && board[nx][ny] === player) {
                    count++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < 5; i++) {
                const nx = x - dx * i;
                const ny = y - dy * i;
                if (nx >= 0 && nx < size && ny >= 0 && ny < size && board[nx][ny] === player) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) {
                return true;
            }
        }
        return false;
    };

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);
        if (board[x][y] === null) {
            placeStone(x, y);
            if (checkWin(x, y)) {
                setTimeout(() => {
                    alert(`${board[x][y]} wins!`);
                    location.reload();
                }, 100);
            }
        }
    });

    drawBoard();
});
