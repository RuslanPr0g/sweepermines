let ctx = null;

let gameTime = 0,
    lastFrameTime = 0;

let currentSecond = 0,
    frameCount = 0,
    framesLastSecond = 0;

let offsetX = 0,
    offsetY = 0;

let flagged = 0;

let grid = [];

let canvas_width = document.getElementsByTagName('canvas')[0].width;
let canvas_height = document.getElementsByTagName('canvas')[0].height;