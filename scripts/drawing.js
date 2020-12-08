function drawMenu() {
    ctx.textAlign = 'center';
    ctx.font = "bold 2em Segoe UI, sans-serif";
	ctx.fillStyle = "#333";

    let y = 100;

    for (let d in difficulties) {
        let mouseOver = (mouseState.y >= (y - 20) && mouseState.y <= (y + 10));

        if (mouseOver) {
			if(difficulties[d].name == 'Easy')
				ctx.fillStyle = "#009900";
			else if (difficulties[d].name == 'Still easy')
				ctx.fillStyle = "#E6A100";
			else if (difficulties[d].name == "Impossible")
				ctx.fillStyle = "#E60023";
        }

        difficulties[d].menuBox = [y - 20, y + 10];
        ctx.fillText(difficulties[d].name, canvas_width / 2, y);
        y += 80;

        if (mouseOver) {
            ctx.fillStyle = "#333";
        }
    }

    y = 125;
    ctx.font = "1em Segoe UI";

    for (let d in difficulties) {
        if (difficulties[d].bestTime == 0) {
            ctx.fillText("No games won", canvas_width / 2, y);
        } else {
            let t = difficulties[d].bestTime;
            let bestTime = "";
            if ((t / 1000) >= 60) {
                bestTime = Math.floor((t / 1000) / 60) + ":";
                t = t % (60000);
            }
            bestTime += Math.floor(t / 1000) +
                "." + (t % 1000);
            ctx.fillText("Nice one - " + bestTime, canvas_width / 2, y + 5);
		}
		
        y += 80;
    }
}

function drawPlaying() {
    let halfW = gameState.cellWidth / 2;
    let halfH = gameState.cellHeight / 2;

    let cDiff = difficulties[gameState.difficulty];

    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    ctx.fillStyle = "#333";
    ctx.font = "bold 1em Segoe UI";
    ctx.fillText(cDiff.name, canvas_width / 2, 50);

    ctx.fillText("Back to menu", canvas_width / 9, 480);

    if (gameState.screen != 'lost') {
        ctx.textAlign = "left";

        ctx.fillText("Remained mines: " + (cDiff.mines - flagged), canvas_width / 9, 90);

        let whichT = (gameState.screen == 'won' ? gameState.timeTaken : gameTime);
        let t = '';
        if ((gameTime / 1000) > 60) {
            t = Math.floor((whichT / 1000) / 60) + ':';
        }
        let s = Math.floor((whichT / 1000) % 60);
        t += (s > 9 ? s : '0' + s);

        ctx.textAlign = "right";
        ctx.fillText("Time: " + t, canvas_width / 5, 50);
    }

    if (gameState.screen == 'lost' || gameState.screen == 'won') {
        ctx.textAlign = "center";
        ctx.font = "bold 20px Segoe UI";
        ctx.fillText(
            (gameState.screen == 'lost' ? "Game over" : "Well done..."), canvas_width / 2, 90);
    }

    ctx.strokeStyle = "#B1D4DA";
    ctx.strokeRect(offsetX, offsetY,
        (cDiff.width * gameState.cellWidth),
        (cDiff.height * gameState.cellHeight));

    ctx.font = "bold 10px Segoe UI";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    flagged = 0;

    for (let i in grid) {
        let CX = offsetX + (grid[i].x * gameState.cellWidth);
        let CY = offsetY + (grid[i].y * gameState.cellHeight);

        if (gameState.screen == 'lost' && grid[i].hasMine) {
            ctx.fillStyle = "#DA0700";
            ctx.fillRect(CX, CY, gameState.cellWidth, gameState.cellHeight);
			ctx.fillStyle = "#FFF";

			let img = document.getElementById("bomb");
			ctx.drawImage(img, CX, CY, gameState.cellWidth, gameState.cellHeight);
        } else if (grid[i].currentState == 'visible') {
            ctx.fillStyle = "#000";

            if (grid[i].danger) {
                ctx.fillStyle = "#000";
				ctx.fillText(grid[i].danger, CX + halfW, CY + halfH);
            }
        } else {
            ctx.fillStyle = "#98C379";
            ctx.fillRect(CX, CY,
                gameState.cellWidth, gameState.cellHeight);
            ctx.strokeRect(CX, CY,
                gameState.cellWidth, gameState.cellHeight);

            if (grid[i].currentState == 'flagged') {
                ctx.fillStyle = "#DA0700";

                flagged += 1;

                let img = document.getElementById("scream");
				ctx.drawImage(img, CX, CY, gameState.cellWidth, gameState.cellHeight);
            }
        }
    }
}

function drawGame() {
    if (ctx == null) {
        return;
    }

    // Frame & update related timing
    let currentFrameTime = Date.now();
    if (lastFrameTime == 0) {
        lastFrameTime = currentFrameTime;
    }
    let timeElapsed = currentFrameTime - lastFrameTime;
    gameTime += timeElapsed;

    // Update game
    updateGame();

    // Frame counting
    let sec = Math.floor(Date.now() / 1000);
    if (sec != currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else {
        frameCount++;
    }

    // Clear canvas
    ctx.fillStyle = "#C7EEF5";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    if (gameState.screen == 'menu') {
        drawMenu();
    } else {
        drawPlaying();
    }

    // Draw the frame count
    ctx.textAlign = "left";
    ctx.font = "10pt Segoe UI";
    ctx.fillStyle = "#333";
    ctx.fillText("Frames: " + framesLastSecond, 2, 12);

    // Update the lastFrameTime
    lastFrameTime = currentFrameTime;

    // Wait for the next frame...
    requestAnimationFrame(drawGame);
}