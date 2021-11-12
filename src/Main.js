
class Main {
    static main(){
        let landTime = 0;
        let slowFallTime = 0;
        let mainGraphic = new Canvas("mycanvas");
        let gameBoard = new Board();
        let score = 0;
        let scoreElement = document.getElementById("score");

        let initialBlocks = Main.setInitialBlocks();
        let handleMino = null;

        mainGraphic.init();

        let Level = setInterval(function(){
            handleMino.moveMino(gameBoard.gameBoard);
            score++;
            scoreElement.innerHTML = "Score : " + score;
        }, 450);

        let NewMino = setInterval(function(){
            if(handleMino == null){
                handleMino = new Tetrimino(initialBlocks.pop());
                if(initialBlocks.length == 0) initialBlocks = Main.setInitialBlocks();
                if(handleMino.checkMinoLand(gameBoard.gameBoard)){
                    alert("Game Over!");
                    clearInterval(Level);
                    clearInterval(NewMino);
                }
            }
            mainGraphic.fillBoard(gameBoard.gameBoard);
            if(handleMino != null){
                mainGraphic.fillHand(handleMino);
            }
            if(handleMino.checkMinoLand(gameBoard.gameBoard) && landTime++ > 300){
                for(let i = 0; i<handleMino.block.length; ++i){
                    gameBoard.gameBoard[handleMino.block[i].y][handleMino.block[i].x] = handleMino.color;
                }
                handleMino = null;
                landTime = 0;
            }
        }, 5);
        
        setInterval(function(){
            for(let i = 0; i<BOARD_HEIGHT; ++i){
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
                    mainGraphic.fillBoard(gameBoard.gameBoard);
                    score += 1000;
                    scoreElement.innerHTML = "Score : " + score;
                }
            }
        }, 5);
        
        window.addEventListener("keydown", function(e){
            if(e.keyCode == '37'){
                //Left Arrow
                let Movable = true;
                for(let i = 0; i<4; ++i){
                    if(handleMino.block[i].x == 0) Movable = false;
                    if(gameBoard.gameBoard[handleMino.block[i].y][handleMino.block[i].x - 1] != -1) Movable = false;
                }
                if(Movable){
                    for(let i = 0; i<4; ++i){
                        handleMino.block[i].x--;
                    }
                }
            }
            if(e.keyCode == '39'){
                //Right Arrow
                let Movable = true;
                for(let i = 0; i<4; ++i){
                    if(handleMino.block[i].x == BOARD_WIDTH - 1) Movable = false;
                    if(gameBoard.gameBoard[handleMino.block[i].y][handleMino.block[i].x + 1] != -1) Movable = false;
                }
                if(Movable){
                    for(let i = 0; i<4; ++i){
                        handleMino.block[i].x++;
                    }
                }
            }
            if(e.code == 'Space'){
                let fastDowned = false;
                let checkMino = handleMino;
                while(!fastDowned){
                    if(checkMino.checkMinoLand(gameBoard.gameBoard)){
                        fastDowned = true;
                    }
                    else{
                        checkMino.moveMino(gameBoard.gameBoard);
                    }
                }
                handleMino = checkMino;
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