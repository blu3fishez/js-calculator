
class Main {
    static LAND_TIMEOUT = 300;
    static main(){
        let mainGraphic = new Canvas("mycanvas");
        let gameBoard = new Board();
        let gameScore = 0;
        let gameScoreElement = document.querySelector('#score');

        let initialBlocks = Main.setInitialBlocks();
        let focusedMino = null;
        let landTime = 0;

        mainGraphic.init();

        const INTERV_SCORE = setInterval(function(){
            focusedMino.moveMino(gameBoard.gameBoard);
            gameScore++;
            gameScoreElement.innerHTML = "Score : " + gameScore;
        }, 450);

        const INTERV_MINO_SPAWN = setInterval(function(){
            if(focusedMino == null){
                focusedMino = new Tetrimino(initialBlocks.pop());
                if(initialBlocks.length == 0) initialBlocks = Main.setInitialBlocks();
                if(focusedMino.checkMinoLand(gameBoard.gameBoard)){
                    alert("Game Over!");
                    clearInterval(INTERV_SCORE);
                    clearInterval(INTERV_MINO_SPAWN);
                }
            }
            mainGraphic.fillBoard(gameBoard.gameBoard);
            if(focusedMino != null){

                mainGraphic.fillHand(focusedMino);
            }
            else{
                mainGraphic.fillBoard(gameBoard.gameBoard);
            }

            if(focusedMino.checkMinoLand(gameBoard.gameBoard) && landTime++ > Main.LAND_TIMEOUT){
                for(let i = 0; i<focusedMino.block.length; ++i){
                    gameBoard.gameBoard[focusedMino.block[i].y][focusedMino.block[i].x] = focusedMino.color;
                }
                focusedMino = null;
                landTime = 0;
                mainGraphic.fillBoard(gameBoard.gameBoard);
            }
        }, 10);
        
        const INTERV_MINO_LINE_CLEAR = setInterval(function(){
            for(let i = 3; i<BOARD_HEIGHT; ++i){
                let clear = true;
                for(let j = 0; j<BOARD_WIDTH; ++j){
                    if(gameBoard.gameBoard[i][j] == -1) clear = false;
                }
                if(clear){
                    for(let k = i - 1; k >= -1; k--){
                        for(let j = 0; j<BOARD_WIDTH; ++j){
                            if(k == -1) gameBoard.gameBoard[0][j] = -1;
                            else gameBoard.gameBoard[k + 1][j] = gameBoard.gameBoard[k][j];
                        }
                    }
                    // mainGraphic.fillBoard(gameBoard.gameBoard);
                    gameScore += 1000;
                    gameScoreElement.innerHTML = "Score : " + gameScore;
                }
            }
        }, 10);
        
        window.addEventListener("keydown", function(e){
            if(e.keyCode == '37'){
                //Left Arrow
                let Movable = true;
                for(let i = 0; i<4; ++i){
                    if(focusedMino.block[i].x == 0) Movable = false;
                    if(gameBoard.gameBoard[focusedMino.block[i].y][focusedMino.block[i].x - 1] != -1) Movable = false;
                }
                if(Movable){
                    for(let i = 0; i<4; ++i){
                        focusedMino.block[i].x--;
                    }
                }
            }
            if(e.keyCode == '39'){
                //Right Arrow
                let Movable = true;
                for(let i = 0; i<4; ++i){
                    if(focusedMino.block[i].x == BOARD_WIDTH - 1) Movable = false;
                    if(gameBoard.gameBoard[focusedMino.block[i].y][focusedMino.block[i].x + 1] != -1) Movable = false;
                }
                if(Movable){
                    for(let i = 0; i<4; ++i){
                        focusedMino.block[i].x++;
                    }
                }
            }
            if(e.code == 'Space'){
                let fastDowned = false;
                let checkMino = focusedMino;
                while(!fastDowned){
                    if(checkMino.checkMinoLand(gameBoard.gameBoard)){
                        fastDowned = true;
                    }
                    else{
                        checkMino.moveMino(gameBoard.gameBoard);
                    }
                }
                focusedMino = checkMino;
                landTime = 301;
            }
            if(String.fromCharCode(e.keyCode) == 'Z'){
                // keyZ, rotate
                // handleMino.rotateMino(gameBoard.gameBoard);
            }
            mainGraphic.fill();
        });
        return 0;
    }

    static setInitialBlocks(){
        let initialBlocks = [];
        for(let count = 0; count<7;){
            let i;
            let pass = false;
            while(!pass){
                i = Math.floor(Math.random()*10%7);
                pass = true;
                for(let j = 0; j<initialBlocks.length; ++j){
                    if(initialBlocks[j] == i) pass = false;
                }
                if(pass){
                    count++;
                    initialBlocks.push(i);
                }
            }
        }
        return initialBlocks;
    }
}

Main.main();