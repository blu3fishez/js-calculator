// tetrimino size : 30px;
// map size : 10 x18;
const CANVAS_RIGHT = 300;
const CANVAS_BOTTOM = 540;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;

// rotate offset
const START_PLACE = {"x":4, "y":0};

const I_MINO = [
    [{"x":0,"y":0},{"x":-1,"y":0},{"x":1,"y":0},{"x":2,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3}],
    [{"x":0,"y":0},{"x":-1,"y":0},{"x":1,"y":0},{"x":2,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3}]
];

const Z_MINO = [
    [{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0},{"x":3,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3}],
    [{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0},{"x":3,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3}]
]

const L_MINO = [
    // 어질어질 하네요..?
];

const M_MINO = [

];

const T_MINO = [

];

const REV_Z_MINO = [

];

const REV_L_MINO = [

];