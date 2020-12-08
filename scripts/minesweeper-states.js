let mouseState = {
    x: 0,
    y: 0,
    click: null
};

let gameState = {
    difficulty: 'easy',
    screen: 'menu',
    newBest: false,
    timeTaken: 0,

    cellWidth: 30,
    cellHeight: 30
};

let difficulties = {
    easy: {
        name: "Easy",
        width: 10,
        height: 10,
        mines: 10,
        bestTime: 0,
        menuBox: [0, 0]
    },
    medium: {
        name: "Still easy",
        width: 10,
        height: 10,
        mines: 30,
        bestTime: 0,
        menuBox: [0, 0]
    },
    hard: {
        name: "Impossible",
        width: 15,
        height: 15,
        mines: 80,
        bestTime: 0,
        menuBox: [0, 0]
    }
};