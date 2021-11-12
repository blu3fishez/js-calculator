class Board{
    constructor(){
        this.gameBoard = new Array(BOARD_HEIGHT);
        this.loadBoard();
    }

    loadBoard(){
        for(let i = 0; i<BOARD_HEIGHT; ++i){
            this.gameBoard[i] = new Int8Array(BOARD_WIDTH);
        }
        for(let i = 0; i<BOARD_HEIGHT; ++i){
            for(let j = 0; j<BOARD_WIDTH; ++j) this.gameBoard[i][j] = -1;
        }
    }
}