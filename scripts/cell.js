function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.hasMine = false;
    this.danger = 0;
    this.currentState = 'hidden';
}

Cell.prototype.calcDanger = function() {
    let cDiff = difficulties[gameState.difficulty];

    for (let CY = this.y - 1; CY <= this.y + 1; CY++) {
        for (let CX = this.x - 1; CX <= this.x + 1; CX++) {
            if (CX == this.x && CY == this.y) {
                continue;
            }

            if (CX < 0 || CY < 0 || CX >= cDiff.width || CY >= cDiff.height) {
                continue;
            }

            if (grid[((CY * cDiff.width) + CX)].hasMine) {
                this.danger++;
            }
        }
    }
};

Cell.prototype.flag = function() {
	if(this.currentState == 'visible')
		return;

	this.currentState = this.currentState == 'hidden' ? 'flagged' : 'hidden';
};

Cell.prototype.click = function() {
    if (this.currentState != 'hidden') {
        return;
    }

    if (this.hasMine == true) {
        gameOver();
    } else if (this.danger > 0) {
        this.currentState = 'visible';
    } else {
        this.currentState = 'visible';
        this.openNeighbours();
    }

    checkState();
};

Cell.prototype.openNeighbours = function() {
    let cDiff = difficulties[gameState.difficulty];

    for (let CY = this.y - 1; CY <= this.y + 1; CY++) {
        for (let CX = this.x - 1; CX <= this.x + 1; CX++) {
            if (CX == this.x && CY == this.y) {
                continue;
            }

            if (CX < 0 || CY < 0 || CX >= cDiff.width || CY >= cDiff.height) {
                continue;
            }

            let idx = ((CY * cDiff.width) + CX);

            if (grid[idx].currentState == 'hidden') {
                grid[idx].currentState = 'visible';

                if (grid[idx].danger == 0) {
                    grid[idx].openNeighbours();
                }
            }
        }
    }
};