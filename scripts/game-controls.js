function checkState() {
    for (let i in grid) {
        if (grid[i].hasMine == false && grid[i].currentState != 'visible') {
            return;
        }
    }

	gameState.timeTaken = gameTime;
	
    let cDiff = difficulties[gameState.difficulty];

    if (cDiff.bestTime == 0 || gameTime < cDiff.bestTime) {
        gameState.newBest = true;
        cDiff.bestTime = gameTime;
    }

    gameState.screen = 'won';
}

function gameOver() {
    gameState.screen = 'lost';
}

function startLevel(diff) {
    gameState.newBest = false;
    gameState.timeTaken = 0;
    gameState.difficulty = diff;
    gameState.screen = 'playing';

    gameTime = 0;
    lastFrameTime = 0;

    grid.length = 0;

    let cDiff = difficulties[diff];

    offsetX = canvas_width / 3;

    offsetY = canvas_height / 8;

    for (let CY = 0; CY < cDiff.height; CY++) {
        for (let CX = 0; CX < cDiff.width; CX++) {
            let idx = ((CY * cDiff.width) + CX);

            grid.push(new Cell(CX, CY));
        }
    }

    let minesPlaced = 0;

    while (minesPlaced < cDiff.mines) {
        let idx = Math.floor(Math.random() * grid.length);

        if (grid[idx].hasMine) {
            continue;
        }

        grid[idx].hasMine = true;
        minesPlaced++;
    }

    for (let i in grid) {
        grid[i].calcDanger();
    }
}

function updateGame() {
    if (gameState.screen == 'menu') {
        if (mouseState.click != null) {
            for (let i in difficulties) {
                if (mouseState.y >= difficulties[i].menuBox[0] &&
                    mouseState.y <= difficulties[i].menuBox[1]) {
                    startLevel(i);
                    break;
                }
            }
            mouseState.click = null;
        }
    } else if (gameState.screen == 'won' || gameState.screen == 'lost') {
        if (mouseState.click != null) {
            gameState.screen = 'menu';
            mouseState.click = null;
        }
    } else {
        if (mouseState.click != null) {
            let cDiff = difficulties[gameState.difficulty];

            if (mouseState.click[0] >= offsetX &&
                mouseState.click[1] >= offsetY &&
                mouseState.click[0] < (offsetX + (cDiff.width * gameState.cellWidth)) &&
                mouseState.click[1] < (offsetY + (cDiff.height * gameState.cellHeight))) {
                let tile = [
                    Math.floor((mouseState.click[0] - offsetX) / gameState.cellWidth),
                    Math.floor((mouseState.click[1] - offsetY) / gameState.cellHeight)
                ];

                if (mouseState.click[2] == 1) {
                    grid[((tile[1] * cDiff.width) + tile[0])].click();
                } else {
                    grid[((tile[1] * cDiff.width) + tile[0])].flag();
                }
            } else if (mouseState.click[1] >= 380) {
                gameState.screen = 'menu';
            }

            mouseState.click = null;
        }
    }
}